---
translationKey: "subdomain-takeover-dangling-dns"
title: "Subdomain Takeover and Dangling DNS: Why an Unused Subdomain Can Hijack Your Brand and How UMKM Fix It"
date: 2026-08-03
draft: false
categories:
  - Cybersecurity
  - Web Security
tags:
  - subdomain takeover
  - dangling dns
  - dns security
  - cname
  - umkm security
  - domain hijacking
  - vercel
  - s3 takeover
summary: "You delete the Shopify store but leave shop.yourdomain.id pointing to it. An attacker claims that name and hosts a fake login on your domain. Learn how dangling DNS creates subdomain takeover and the fix you run in one afternoon."
cover: "/images/articles/subdomain-takeover.webp"
---

You launch a campaign microsite at promo.yourdomain.id. You point the name to a Vercel project or a Shopify store. The campaign ends. You delete the project at Vercel but you leave the DNS record. Months later a visitor opens promo.yourdomain.id and sees a login page that looks like yours but steals credentials. The page lives on your domain, under your TLS certificate, with your brand in the URL bar.

You did not get hacked through your main site. You left a dangling pointer, and someone else claimed the resource you pointed to.

This guide shows you how dangling DNS creates subdomain takeover, why UMKM and small teams hit this trap often, what damage an attacker does with your subdomain, and how you find and fix the records with tools you can run today.

## What a subdomain and a DNS record do

Your domain is yourdomain.id. A subdomain adds a label in front, like shop.yourdomain.id, blog.yourdomain.id, or api.yourdomain.id. DNS tells browsers where to find that name.

DNS uses record types.

- **A record** maps a name to an IP, like `promo.yourdomain.id -> 76.76.21.21`.
- **CNAME** maps a name to another name, like `shop.yourdomain.id -> shops.myshopify.com` or `promo.yourdomain.id -> cname.vercel-dns.com`.
- **NS** delegates a subdomain to other name servers, like `partners.yourdomain.id NS -> ns1.provider.com`.

The CNAME and NS paths matter most for takeover. They delegate control of that name to an external service. Your DNS says go look at that provider. The provider decides what content to serve for that name. If you stop paying for the provider resource but you keep the DNS delegation, you tell the world to trust a resource you no longer control.

## Dangling DNS and takeover in plain flow

Takeover needs two conditions.

**Condition 1: A dangling pointer.** Your DNS still points a name to a provider resource that no longer exists or that you no longer own. Examples:

- `shop.yourdomain.id CNAME shops.myshopify.com` but you closed the Shopify store named `shop-yourdomain`.
- `promo.yourdomain.id CNAME cname.vercel-dns.com` but you deleted the Vercel project.
- `docs.yourdomain.id CNAME yourdomain.github.io` but you deleted the GitHub repo.
- `assets.yourdomain.id CNAME yourdomain.s3-website-ap-southeast-1.amazonaws.com` but you deleted the S3 bucket.
- `partners.yourdomain.id NS ns1.oldvendor.com` but the vendor closed the account and released the NS host.

**Condition 2: The provider allows anyone to claim that resource name.** Many providers let any account create a new site or bucket with the same name if no one holds it. The attacker creates a new project named `shop-yourdomain` at Shopify, or recreates the S3 bucket `yourdomain`, or adds `promo.yourdomain.id` to their own Vercel account. The provider then serves attacker content for your name because your DNS still points there.

The browser follows your DNS. The provider matches the Host header `promo.yourdomain.id`. The attacker now hosts code on your subdomain with a valid path, and often with a valid certificate.

## Why UMKM and small teams face this often

Teams with small headcount create many subdomains over time.

- A campaign agency creates `ramadhan2023.yourdomain.id` at a no-code host.
- A freelancer moves the company blog from WordPress to `blog.yourdomain.id` at Ghost or Hashnode, then moves again.
- A store tests Shopify at `shop.yourdomain.id`, then returns to Tokopedia and leaves the record.
- A dev tests an API at `staging-api.yourdomain.id` pointing to Heroku or Fly.

No one owns a decommission checklist. The person who created the CNAME left the company. The DNS panel at Cloudflare, IDCloudHost, Rumahweb, or Niagahoster holds 30 records and no note explains each. A new hire fears deleting an old CNAME will break something, so the record stays for years.

Attackers know this. They scan Certificate Transparency logs for subdomains, then probe which ones return NXDOMAIN or provider not-found pages. Automation makes the hunt cheap. Tools like Subzy, Nuclei, and custom scripts check hundreds of provider fingerprints. When a fingerprint matches a dangling state, the tool flags it as take-over-able. The attacker claims the name for a few dollars or for free.

## What an attacker does with your subdomain

A subdomain under your root domain inherits trust you built.

**Phishing that passes eyeball check.** The attacker hosts `promo.yourdomain.id/login` that mimics your main login. Victims see yourdomain.id in the URL and trust it. Email filters also treat mail with links under yourdomain.id as more reputable than a random domain. The attacker sends `Diskon 50% di promo.yourdomain.id` to your customer list scraped from a prior breach.

**Cookie and credential spill.** If your main app at `yourdomain.id` sets a cookie with `Domain=.yourdomain.id`, a page at `promo.yourdomain.id` can read that cookie in some setups or can set a new cookie that the main site then trusts. Even when you scope cookies correctly, users who reuse passwords across subdomains give the attacker the same credential the attacker then tries at `yourdomain.id`.

**SPF and DMARC confusion for email.** The attacker cannot automatically send email as `promo.yourdomain.id` if you have correct SPF, but the attacker can host a password reset flow at `promo.yourdomain.id` that collects reset tokens or that abuses OAuth redirect URIs you left whitelisted for that old subdomain.

**SEO poisoning and malware distribution.** The attacker hosts keyword-stuffed pages or download pages at `assets.yourdomain.id`. Google indexes content under your domain. Your search reputation drops, and your users download malicious files from a trusted domain. Ad networks also block your domain for unsafe content, and you lose ad revenue.

**TLS certificate that looks legit.** Many providers issue free certificates through Let's Encrypt once the attacker claims the resource. The browser shows a padlock for the attacker page. Users look for the padlock and see it, so they trust the page further.

## How you spot dangling records with free tools

You need an inventory and a probe.

### 1. Build the subdomain list you own

Pull from sources you control.

- Export the DNS zone from Cloudflare, Rumahweb, IDCloudHost, or your registrar. That export is the ground truth for records you publish.
- Check Certificate Transparency at crt.sh or censys. Search `%.yourdomain.id`. That shows every name that once had a cert, including old promo names you forgot.
- Check your code repos for CNAME references and your cloud dashboards for past projects.

Compare the three lists. The DNS export often contains names that no longer appear in your code. Those are your suspects.

### 2. Probe each name for dangling fingerprints

From your laptop you run:

```
dig promo.yourdomain.id CNAME +short
dig promo.yourdomain.id A +short
curl -s -I https://promo.yourdomain.id | head
```

A dangling CNAME often returns a name that resolves to a provider error page. For example, a GitHub Pages CNAME that dangled returns GitHub 404. A Shopify CNAME returns `Sorry, this shop is currently unavailable`. A S3 CNAME returns `NoSuchBucket`. An Azure Website returns `404 Web Site not found`. A Heroku CNAME returns `No such app`.

Track fingerprints with a scanner. Run Subzy with provider manifest:

```
subzy run --targets subdomains.txt --hide_fails --vuln
```

Or run Nuclei with takeover templates:

```
nuclei -l subdomains.txt -t http/takeovers/ -o takeover.csv
```

These tools match known strings like `There isn't a GitHub Pages site here` or `The specified bucket does not exist` and report only high-confidence hits. You confirm each hit by hand with curl.

### 3. Test claimability without crossing into abuse

You try to claim the resource name in your own test account at the provider. If the provider says that name is available, but your DNS still points to it, you have proof of takeover risk. Create the test project in your own account, verify you can set the custom domain to that subdomain, then delete the DNS record or reclaim the resource. Never claim a name at a provider with intent to host misleading content on someone else domain, and never retain a claim on a client name you do not own.

## Fix you do this afternoon

Pick one domain you control and run this sequence. Budget 90 minutes.

**Step 1: Inventory 20 minutes.** Export the zone file. Paste into a spreadsheet with columns `name`, `type`, `target`, `owner`, `risk`. Add notes for each record you recognize and flag each you do not.

**Step 2: Probe 30 minutes.** Run dig and curl for each flagged name. Mark those that return provider error pages. Run Subzy or Nuclei for confirmation.

**Step 3: Patch 30 minutes.** For each confirmed dangling record, choose one fix.

- If the app is gone, delete the DNS record. Do this at the authoritative zone, not just at the provider.
- If the app moved, update the CNAME to the new target or change to an A record that points to your own server.
- If you still need the name but not the provider, point it to a parking page you control that returns 404 and logs visits.

Set TTL to 300 seconds before you change so the bad record expires fast from caches.

**Step 4: Reclaim 10 minutes where needed.** At the provider, recreate the project with the same name in your own account and park it, or register the bucket again and block public access. This holds the name while you remove the DNS.

**Step 5: Monitor ongoing.** Add the fix to your offboarding checklist so future deletes include DNS cleanup.

## Prevention that survives team churn

A one-time sweep helps. A process prevents the next sweep.

**Own a single DNS inventory file.** Keep a `dns-inventory.md` in your internal docs or wiki. Each row tracks `subdomain`, `target`, `provider`, `project name`, `owner`, `created`, `decommission date`. New subdomains get a row when created, not when someone remembers.

**Require tickets for DNS changes.** Create a simple template: `requester`, `name`, `type`, `target`, `business reason`, `expiry review date`. Review expiry dates quarterly. If a campaign ends on 30 April, the ticket reminds you on 5 May to check if the record can go.

**Lock DNS permissions.** At Cloudflare or other panels, give `edit` rights to only two people. Others get `read`. This cut reduces orphaned records.

**Monitor with automation.** Run a weekly job that pulls the zone, runs Subzy, and posts results to a Slack channel. You catch new dangling records within days, not years.

**Tie provider decommission to DNS.** When you delete a Vercel project, your runbook says open the DNS panel and delete the CNAME in the same minute. Pair the actions in the same ticket. The pair prevents the dangling gap.

**Harden the brand edge.** Add a CAA record that limits which CA can issue certs for your subdomains. Add a wildcard? No, avoid wildcard certificates if you can. A specific cert per subdomain makes unexpected issuance easier to spot in CT logs. Monitor CT with a free alert at facebook CT monitor or certstream.

## What you do when you find an active takeover

You probe `promo.yourdomain.id` and see a phishing login you did not build. Move fast.

- Take a screenshot with timestamp and save the HTML with `curl -L https://promo.yourdomain.id > evidence.html`. Keep the HTTP headers.
- Delete the DNS record at your authoritative provider immediately. Do not wait to reclaim the provider resource first. DNS deletion cuts traffic.
- Change passwords for any account that used that subdomain for OAuth redirects. Rotate any webhook secrets that referenced that host.
- Check logs for visits to that subdomain in your CDN or in Google Search Console. Note IPs and user agents if you have them.
- Report abuse to the provider that hosts the attacker project. Provide the URL and the screenshot. Most providers suspend the attacker site within hours.
- If the page collected customer credentials, notify your customers with a short, direct notice that lists the exact URL, the time window, and the steps you took. Advise password change and enable 2FA at your main site.
- If the takeover hosted malware, submit a review at Google Safe Browsing after you clean.

You keep evidence for 90 days even after you clean. A customer dispute or an insurer follow-up may ask for that timeline.

## Checklist you run every quarter

You need 15 minutes per domain.

- You export the zone and compare to `dns-inventory.md`. You flag new or undocumented names.
- You run `dig` and `curl` for each flagged name and note the response body.
- You run Subzy or Nuclei and confirm zero high-confidence hits.
- You delete or update any dangling record and log the change.
- You check CT logs for new subdomains you did not authorize.
- You verify CAA still covers only your chosen CA and that no wildcard cert appeared.

You add the check to your monthly security audit sheet next to patch and backup checks so you do not skip it. You note the date and the person who ran the check so the next review has context. That note closes the ownership gap that creates most dangling records.

## Extra check for Vercel, Netlify, and Cloudflare Workloads

You use Vercel or Netlify for fast campaigns. Both let you add a custom domain with CNAME or with their nameservers. The takeover pattern at these hosts looks similar. You delete the project at the host, the host frees the domain link, but your DNS still points there. Another account can add the same domain and pass verification because the DNS already points to the host. The fix stays the same. At the host dashboard remove the custom domain before you delete the project, then remove the DNS record. Verify with `dig` that the name no longer resolves to the host.

## Why this audit earns its time for AdSense and business trust

A subdomain takeover does not just create a security incident. It creates a business incident that blocks revenue.

- AdSense and other networks flag domains that serve phishing or malware. One bad subdomain can pull the whole domain into a warning.
- Google Search Console shows security issues at the domain level. A flag suppresses rankings for all pages, not just the bad subdomain.
- Customers who see a fake page on your domain lose trust in the real checkout at your main domain. Recovery takes longer than the technical fix.

A quarterly scan costs less than one hour and protects that trust.

## Sources and where you learn more

- OWASP WSTG-CONF-10 on testing subdomain takeover
- HackerOne disclosed reports on Shopify, GitHub Pages, and S3 takeover patterns, 2022 to 2024
- ProjectDiscovery Nuclei takeover templates repository and fingerprints
- Certspotter and crt.sh docs for CT log search
- Cloudflare and IDCloudHost docs on CNAME and zone management
- ENISA Threat Landscape on web and DNS abuse phases

> You own every name you publish in DNS, even the names you forgot. A dangling pointer publishes your brand on infrastructure you no longer control. Remove the pointer, reclaim or delete the resource, and review the list each quarter. That small routine removes one of the easiest takeover paths attackers use today.

