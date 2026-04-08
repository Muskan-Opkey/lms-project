# Video Gallery Setup Guide

## Overview
The gallery component is now set up with placeholders for demo videos covering:
- **Python** - Python Programming Fundamentals
- **Java** - Java Enterprise Development  
- **JavaScript** - JavaScript Modern Development
- **.NET Core** - .NET Core Development
- **MEAN Stack** - MEAN Stack Complete Guide
- **MERN Stack** - MERN Stack Masterclass

Each video prominently displays the website offers:
- ✅ **30% OFF** on your first course
- ✅ **Assignments** for practice
- ✅ **Reviewed by Mentors**

## How to Add Your Demo Videos

### Step 1: Create Your Videos
Record videos where instructors teach each technology and mention the website features:
- Demonstrate the technology (Python, Java, JS, .NET Core, MEAN, MERN)
- Explain the 30% discount offer for first-time students
- Showcase the assignments feature
- Highlight mentor review benefits

### Step 2: Upload to Video Platform
Upload your videos to one of these platforms:
- **YouTube** (Recommended - free, reliable)
- **Vimeo** (Professional option)
- **Wistia** (Business option)
- Your own video hosting server

### Step 3: Get Embed URLs

#### For YouTube:
1. Go to your video on YouTube
2. Click "Share" → "Embed"
3. Copy the URL from the iframe src (format: `https://www.youtube.com/embed/VIDEO_ID`)

#### For Vimeo:
1. Go to your video on Vimeo
2. Click the "Share" button
3. Get the embed code URL (format: `https://player.vimeo.com/video/VIDEO_ID`)

### Step 4: Update the Component

#### Option A: Direct URL Update (gallery.component.ts)
Open `src/app/components/gallery/gallery.component.ts` and replace the placeholder URLs:

```typescript
demoVideos: DemoVideo[] = [
  {
    id: 1,
    title: 'Python Programming Fundamentals',
    videoUrl: 'https://www.youtube.com/embed/YOUR_ACTUAL_PYTHON_VIDEO_ID',
    // ... rest of properties
  },
  // ... update all 6 videos
]
```

#### Option B: Use iframe in HTML
1. Open `src/app/components/gallery/gallery.component.html`
2. Find the commented iframe section (around line 56)
3. Uncomment the iframe code:
```html
<iframe 
  [src]="video.videoUrl | safe" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```
4. Comment out or remove the placeholder div above it

### Step 5: Create a Safe URL Pipe (Required for Security)

Create a new pipe to sanitize video URLs:

```bash
ng generate pipe safe
```

Or create manually at `src/app/pipes/safe.pipe.ts`:

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
```

Then add it to `app.module.ts`:
```typescript
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    // ... other components
    GalleryComponent,
    SafePipe  // Add this
  ],
  // ...
})
```

### Step 6: Update Thumbnails (Optional)
Add custom thumbnail images:
1. Place images in `src/assets/thumbnails/`
2. Update the `thumbnail` property in each video object
3. Display thumbnails as needed

## Video Content Recommendations

### Each demo video should include:
1. **Introduction** (30 seconds)
   - Welcome message
   - Instructor introduction
   - Course overview

2. **Technology Demo** (3-5 minutes)
   - Live coding example
   - Explain key concepts
   - Show practical application

3. **Platform Features** (1-2 minutes)
   - Mention "Get 30% off your first course"
   - Show assignment examples
   - Explain mentor review process

4. **Call to Action** (30 seconds)
   - Encourage enrollment
   - Direct to website

### Optimal Video Specifications:
- **Duration**: 5-8 minutes per video
- **Resolution**: 1920x1080 (Full HD)
- **Format**: MP4 (H.264)
- **Audio**: Clear, professional microphone
- **Captions**: Enable for accessibility

## Testing Your Videos

1. Start the development server:
   ```bash
   ng serve
   ```

2. Navigate to: `http://localhost:4200/gallery`

3. Verify:
   - ✅ All 6 videos load correctly
   - ✅ Videos are responsive on mobile
   - ✅ Promotional offers are visible
   - ✅ Navigation works properly

## Support Links
- [YouTube Embed Guide](https://support.google.com/youtube/answer/171780)
- [Vimeo Embed Guide](https://vimeo.com/blog/post/how-to-embed-videos/)
- [Angular DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer)

## Need Help?
If you encounter issues:
1. Check browser console for errors
2. Verify video URLs are correct embed format
3. Ensure SafePipe is properly implemented
4. Test videos directly on hosting platform first
