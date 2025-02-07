import axios from "axios";
import * as cheerio from "cheerio";
import async from "async";
//@ts-ignore
import { URL } from "url";

// Configuration
const MAX_CONCURRENCY = 5;
const REQUEST_TIMEOUT = 10000;
// const SEED_URL = "https://lpu.in";
const SEED_URL = "https://lpu.in";
//const USER_AGENT = "LPUWebCrawler/1.0";
const USER_AGENT = "";
// const DOMAIN_TOCONIDER_ONLY = "lpu.in";
const DOMAIN_TOCONIDER_ONLY = "";

const visitedUrls = new Set();
const queue = async.queue(crawlUrl, MAX_CONCURRENCY);

// Start the crawler
queue.push(SEED_URL);
console.log(`Crawler started with seed URL: ${SEED_URL}`);

// Handle queue completion
queue.drain(() => {
  console.log("\nCrawling completed! Visited URLs:");
  console.log([...visitedUrls].join("\n"));
});

// Main crawling function
async function crawlUrl(url: string, callback: any) {
  try {
    if (shouldSkipUrl(url)) return;

    visitedUrls.add(url);
    console.log(`Crawling: ${url}`);

    // Fetch page content
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      headers: { "User-Agent": USER_AGENT },
    });
    // Extract and process links
    const links: any = extractLinks(response.data, url);
    links.forEach((link: any) => queue.push(link));
  } catch (error: any) {
    console.error(`Error crawling ${url}: ${error.message}`);
  } finally {
    callback();
  }
}

// URL validation and filtering
function shouldSkipUrl(url: any) {
  try {
    const parsedUrl = new URL(url);
    return (
      visitedUrls.has(url) ||
      !parsedUrl.hostname.endsWith(DOMAIN_TOCONIDER_ONLY)
      // || (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")
    );
  } catch {
    return true;
  }
}

// Link extraction and normalization
function extractLinks(html: any, baseUrl: any) {
  const $ = cheerio.load(html);
  const links = new Set();

  $("a").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;

    try {
      const absoluteUrl = new URL(href, baseUrl);

      // Normalize URL
      absoluteUrl.hash = "";
      const normalizedUrl = absoluteUrl.toString();

      links.add(normalizedUrl);
    } catch (error) {
      console.error(`Invalid URL: ${href}`);
    }
  });
  return [...links];
}
