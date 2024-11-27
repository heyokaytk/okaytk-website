# OKAY TK DJ Website

This is the official website for DJ OKAY TK, built with [Hugo](https://gohugo.io/) and styled using [Tailwind CSS](https://tailwindcss.com/). The website is hosted on AWS CloudFront and deployed automatically through GitHub CI/CD actions.

The development site is currently deployed to [d3lgpv95v1cebt.cloudfront.net](https://d3lgpv95v1cebt.cloudfront.net/)

## Project Overview

- **Hugo**: Hugo is a fast, static site generator written in Go. It allows us to build dynamic content quickly with markdown files and templates.
- **Tailwind CSS**: Tailwind is a utility-first CSS framework that provides pre-defined classes to style the website effectively and responsively.
- **AWS CloudFront**: AWS CloudFront is used to serve the website globally, ensuring fast load times and secure content delivery.

## TODOs:
Todos have been moved to the issues section of this GitHub repo.

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
   hugo  server --logLevel debug --navigateToChanged --disableFastRender --noHTTPCache --buildDrafts
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

## Adding Content to a Post

### Images 

Each post will have its own **images** folder. Anything you drop in here will be available to that blog post. Images are automatically reformatted to webp for better performance.

To include an image in the blog post reference it like so:

```markdown	
![image description here](images/facebook.jpg)
```
The description is used as the alt text and is contributes to how SEO rank the site.

### Links

To create a link you just need the text you would like to see and the link to the site.
```markdown
[Serato Stems](https://serato.com/dj/pro/stems)
```
### Youtube videos
Adding a YT video is pretty straight forward. You just need the video ID which can be pulled from the video's url.

The ID is in the URL of the video: `https://www.youtube.com/watch?v=sdCd54ec5io` where **sdCd54ec5io** is the ID.

To embed a YouTube video
```hugo
{{< youtube sdCd54ec5io >}}
```

### Instagram
	
{{< instagram C6ulegJpfOF >}}

### Twitter

{{< twitter user="heyokaytk" id="1857664030766239997" >}}

# Reference 

Render Hooks for styling the blog post

[render-hooks](https://gohugo.io/render-hooks/introduction/)

```plaintext
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
```
# TAGS

tags have not yet been implemented.

Tags can be used to sort and filter post. It will also make it easier for users to hone in on the content they want.

### Audience Descriptions

The **Audience** tag communicates who the blog post is primarily intended for. Will the article use industry lingo?

- **DJs**: Experienced performers who spin music for events, looking to refine their craft, learn new techniques, and stay updated on industry trends.  

- **Fans**: Enthusiasts who follow DJs and attend shows for entertainment, curious about behind-the-scenes stories and the creative process.  

- **Promoters**: Professionals who organize and market events, interested in trends, audience engagement, and insights to plan successful shows.  

- **Audiophiles**: People who deeply appreciate high-quality sound and gear, seeking reviews and technical details about DJ equipment and production.  

- **Music Lovers**: General music enthusiasts who enjoy discovering new tracks, albums, and the cultural impact of music.  

- **Aspiring DJs**: Beginners or hobbyists looking to break into DJing, eager for practical tips, guides, and advice to develop their skills and grow their careers.  

### Topic Descriptions

The **Topic** tag communicates the primary focus of the blog post, identifying the scope and subject matter.

- **Technique**: The skills and methods DJs use to perform, including mixing, transitions, library organization, and other technical aspects of the craft.  

- **Music**: Exploration of genres, tracks, albums, and trends that influence DJ sets and connect with audiences.  

- **Gear**: Reviews, guides, and insights into the equipment and tools DJs use, such as controllers, headphones, speakers, and production software.  

- **Industry**: Insights into the broader DJ and music industry, including trends, events, and collaboration opportunities.  

- **Career**: Advice and stories about building and sustaining a DJ career, from branding and marketing to managing gigs and income streams.  

### Type Descriptions

The **Type** tag communicates the purpose and structure of the blog post, helping readers quickly understand what to expect.

- **Opinion**: Personal perspectives, hot takes, and commentary on topics related to DJing, music, and the industry.  

- **Tips**: Actionable advice and recommendations to help DJs improve their skills, performances, and workflows.  

- **Guides**: Step-by-step instructions and how-to articles covering techniques, gear setups, and other practical aspects of DJing.  

- **Review**: In-depth evaluations of gear, music, or events, highlighting pros, cons, and overall impressions.  

- **Recap**: Summaries and reflections on past events, performances, or trends, sharing insights and key takeaways.  

# Post Ideas
I would love to see you write these post:

---

#### 1. Equipment Setup: Controller, Speakers, Headphones, etc.
- **Audience:** Aspiring DJs  
- **Topic:** Gear  
- **Type:** Guides  

---

#### 2. How Many Airhorns per Minute is Appropriate? (Airhorns = Song's BPM / 4.28?)
- **Audience:** DJs  
- **Topic:** Technique  
- **Type:** Opinion  

---

#### 3. How Do You Bring a Song into Your Library? (Set Cues, Cue Layout, Multiple Versions, Sample Bank)
- **Audience:** DJs  
- **Topic:** Technique  
- **Type:** Tips  

---

#### 4. How Do You Lay Out Your Library? Do You Have a Naming Convention?
- **Audience:** Aspiring DJs  
- **Topic:** Technique  
- **Type:** Guides  

---

#### 5. What Album is Slept On?
- **Audience:** Music Lovers  
- **Topic:** Music  
- **Type:** Opinion  

---

#### 6. What is a Cool Trend You Are Seeing at the Shows? (Trends from Other DJs)
- **Audience:** Promoters  
- **Topic:** Industry  
- **Type:** Recap  

---

#### 7. How Do You Find a Handsome Developer to Help Build a Website?
- **Audience:** DJs  
- **Topic:** Career  
- **Type:** Opinion  

---

#### 8. How Do You Prepare for an Event? How Much Do You Practice?
- **Audience:** Aspiring DJs  
- **Topic:** Career  
- **Type:** Tips  

---

#### 9. Is There Money in Twitch?
- **Audience:** DJs  
- **Topic:** Career  
- **Type:** Opinion  

---

#### 10. How Do You Get the Dope Twitch Setup You Had? (FYI DJ Green Lantern Has a Sick Twitch Stream)
- **Audience:** Aspiring DJs  
- **Topic:** Gear  
- **Type:** Guides  

---

#### 11. How Do You Build a Brand as a DJ?
- **Audience:** DJs  
- **Topic:** Career  
- **Type:** Tips  

---

#### 12. What to Do if You Think Someone is Stalking You (Showing Up at Your Shows, Suggesting Articles for You to Write)?
- **Audience:** DJs  
- **Topic:** Career  
- **Type:** Opinion  

---

#### 13. Stories from the Road
- **Audience:** Fans  
- **Topic:** Industry  
- **Type:** Recap  

---

#### 14. What Does It Take to Put Together a Show Like Mixtape?
- **Audience:** Promoters  
- **Topic:** Industry  
- **Type:** Guides  

---

#### 15. Should Halifax Have More Venues?
- **Audience:** Fans  
- **Topic:** Industry  
- **Type:** Opinion  

---

#### 16. Transition of the Month
- **Audience:** DJs  
- **Topic:** Technique  
- **Type:** Recap  

---

#### 17. DJ Set Breakdown: Transition Breakdown, etc.
- **Audience:** Aspiring DJs  
- **Topic:** Technique  
- **Type:** Guides  


