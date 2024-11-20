# OKAY TK DJ Website

This is the official website for DJ OKAY TK, built with [Hugo](https://gohugo.io/) and styled using [Tailwind CSS](https://tailwindcss.com/). The website is hosted on AWS CloudFront and deployed automatically through GitHub CI/CD actions.

The development site is currently deployed to [d3lgpv95v1cebt.cloudfront.net](https://d3lgpv95v1cebt.cloudfront.net/)

## Project Overview

- **Hugo**: Hugo is a fast, static site generator written in Go. It allows us to build dynamic content quickly with markdown files and templates.
- **Tailwind CSS**: Tailwind is a utility-first CSS framework that provides pre-defined classes to style the website effectively and responsively.
- **AWS CloudFront**: AWS CloudFront is used to serve the website globally, ensuring fast load times and secure content delivery.

# TODOs:
- [ ] There are a few recommendations on https://pagespeed.web.dev/ for better accesibility. I will work through these soon.
- [ ] Add more content to the website
- [ ] update the Events layout to adhere to best practices in pagespeed.
- [ ] What should we do if there are no upcoming events. what about reoccuring events?
- [ ] add padding to the mobile version of the home page
- [ ] fix overflow width on the mobile version of the home page. I think it is due to the mixtapes section
- [ ] write the instruction manual for updating the content.
- [ ] write an alias for TK to use in the terminal.
- [ ] Events should check to see if there are any upcoming dates. if not write a short description, maybe link to an event RSS Feed.
- [ ] Event check happens in JS currently, this should be migrated to Hugo.
- [x] fix the menu bar to naivagte back to the proper page/anchor. currently it is only rerouting to a local anchor

## Getting Started

### Prerequisites
- Install [Homebrew](https://www.youtube.com/watch?v=IWJKRmFLn-g)
- Install Go: `brew install go`
- Install Hugo: `brew install hugo`
- Install [Node.js and npm](https://nodejs.org/) for Tailwind CSS
- Install [VS Code](https://code.visualstudio.com/download)
- Install VS Code Extensions:
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   - [Hugo Language and Syntax Support](https://marketplace.visualstudio.com/items?itemName=budparr.language-hugo-vscode)

### Development Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jeremyforan/okaytk-website.git
   cd okay-tk-website
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   hugo server --disableFastRender --noHTTPCache
   ```

4. **Open the Browser**:
   Navigate to `http://localhost:1313/` to view the website.


## Project Structure

<!-- TODO: fix this with more relevant information -->
The project is structured as follows:
   
   ```
   .
   ├── archetypes/         # Hugo archetypes for new content
   ├── assets/             # CSS, JS, and image assets. These are compiled and minified for production.
   ├── content/            # Markdown content for the website, mostly the future blog post
   ├── data/               # Data files for the website. Events, social media links, etc.
   ├── layouts/            # HTML templates for the website. The actual structure of the website
   ├── public/             # Generated static website. The compiled website which is what is published
   ├── resources/          # Generated resources
   ├── static/             # Static files for the website. PDFs, documents, things that don't need to be compiled.
   ├── themes/             # Hugo theme for the website. This is not used for this site and can be ignored.
   ├── config/
   │  ├─ _default/        # Default configuration settings for the website
   │  |  ├─ hugo.toml     # Website config file. Contains global settings for the website and the Title, Domain, Etc.
   ```

# New Blog Post

To create a new blog post, with the title being 'Crunkmas Mixtape' cd to the project directory and run the following command:

```bash
hugo new content content/posts/crunkmas-mixtape
```

This will create a new directory in the content/posts/ directory with the name 'crunkmas-mixtape'. Inside this directory, you will find an index.md file with the following content:

```markdown
+++
date = '2024-11-18T15:24:17-05:00'
draft = false
title = 'Crunkmas Mixtape'
+++

.....
```


# Reference 

Render Hooks for styling the blog post

[render-hooks](https://gohugo.io/render-hooks/introduction/)

layouts/
└── _default/
    └── _markup/
        ├── render-blockquote.html
        ├── render-codeblock.html
        ├── render-heading.html
        ├── render-image.html
        ├── render-link.html
        ├── render-passthrough.html
        └── render-table.html
