# OKAY TK DJ Website

This is the official website for DJ OKAY TK, built with [Hugo](https://gohugo.io/) and styled using [Tailwind CSS](https://tailwindcss.com/). The website is hosted on AWS CloudFront and deployed automatically through GitHub CI/CD actions.

The development site is currently deployed to [d3lgpv95v1cebt.cloudfront.net](https://d3lgpv95v1cebt.cloudfront.net/)

## Project Overview

- **Hugo**: Hugo is a fast, static site generator written in Go. It allows us to build dynamic content quickly with markdown files and templates.
- **Tailwind CSS**: Tailwind is a utility-first CSS framework that provides pre-defined classes to style the website effectively and responsively.
- **AWS CloudFront**: AWS CloudFront is used to serve the website globally, ensuring fast load times and secure content delivery.

# TODOs:
- [ ] Add more content to the website
- [x] Add "Press Kit" link to main navigation menu. Link will instantly download Press Kit file (.zip)
- [x] Are we able to make the menu (header) be a floating menu that follows as you scroll down?
- [x] update fonts - Fonts Used - (Header/Footer: Helvetica) - (Body: Georgia)
- [x] update the format of the Nav Bar
- [ ] fix the mixes layout, they should be centered to the page. make them look more like cassette tapes
- [ ] update the Events layout
- [ ] add padding
- [ ] write the instruction manual for updating the content
- [ ] all white nav bar

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


   
