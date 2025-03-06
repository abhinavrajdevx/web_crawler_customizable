# Customizable Web Crawler

This repository contains a simple, customizable web crawler built using Node.js, `axios`, `cheerio`, and `async`. It allows you to crawl websites, extract links, and control various aspects of the crawling process.

## Features

-   **Configurable Parameters:** Easily adjust settings such as maximum concurrency, request timeout, seed URL, user agent, and domain filtering.
-   **Concurrency Control:** Uses `async.queue` to manage concurrent requests and prevent overloading the target website.
-   **Robust Error Handling:** Includes error handling for invalid URLs and request failures.
-   **URL Normalization:** Normalizes URLs to ensure consistent crawling and avoid duplicate entries.
-   **Domain Filtering:** Option to limit crawling to a specific domain.
-   **Visited URL Tracking:** Keeps track of visited URLs to prevent revisiting the same pages.

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

## Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/abhinavrajdevx/web_crawler_customizable.git](https://www.google.com/search?q=https://github.com/abhinavrajdevx/web_crawler_customizable.git)
    cd web_crawler_customizable
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

## Configuration

The crawler's behavior can be customized by modifying the following constants in the `index.ts` file:

-   `MAX_CONCURRENCY`: The maximum number of concurrent requests.
-   `REQUEST_TIMEOUT`: The request timeout in milliseconds.
-   `SEED_URL`: The starting URL for the crawl.
-   `USER_AGENT`: The user agent string to send with requests.
-   `DOMAIN_TOCONIDER_ONLY`: The domain to restrict crawling to (leave empty to crawl all domains).

Example:

```typescript
const MAX_CONCURRENCY = 10;
const REQUEST_TIMEOUT = 5000;
const SEED_URL = "[https://example.com](https://example.com)";
const USER_AGENT = "MyCustomCrawler/1.0";
const DOMAIN_TOCONIDER_ONLY = "example.com";
```

## Usage
-   **Modify the configuration as needed.
-   **Run the crawler:
          ```bash
          npm run dev
          ```
-   **The crawler will start crawling from the specified SEED_URL and output the visited URLs to the console upon completion.

##Code Explanation
-   **axios: Used for making HTTP requests to fetch web pages.
-   **cheerio: Used for parsing HTML and extracting links.
-   **async: Used for managing concurrent requests and handling asynchronous operations.
-   **URL: Node.js built-in module for URL parsing and manipulation.

The crawler uses a queue (async.queue) to manage the crawling process. The crawlUrl function fetches a URL, extracts links, and adds them to the queue. The shouldSkipUrl function filters URLs based on visited status and domain. The extractLinks function parses HTML and extracts valid links.

##Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs. 1  
