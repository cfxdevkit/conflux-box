# Demo Video Instructions

## 📹 Demo Video Requirements

**Duration**: 3-5 minutes maximum  
**Format**: MP4 (recommended), MOV, or YouTube/Vimeo link  
**Quality**: 720p minimum, 1080p preferred  
**Audio**: Clear narration explaining the project

## 🎬 Video Structure & Script

### 1. Introduction (30 seconds)

```
"Hi, I'm [Your Name], and I'm excited to present Conflux Box for the Code Without Borders SummerHackfest 2025.

Conflux Box is a modern, beautiful frontend for Conflux blockchain development, built with Mantine UI and powered by the official Conflux DevKit packages.

The problem we're solving is that Conflux development lacked a modern, user-friendly interface that developers could use to easily interact with both Core Space and eSpace networks."
```

### 2. Solution Overview (60 seconds)

```
"Our solution is Conflux Box - a comprehensive development frontend that provides:

- A clean, modern interface built with Mantine UI
- Real-time blockchain monitoring and network status
- Account creation and management tools
- Smart contract deployment and interaction
- Seamless switching between Conflux Core and eSpace networks
- Integration with the official published DevKit packages

This makes Conflux development more accessible and enjoyable for developers of all skill levels."
```

### 3. Live Demo (2-3 minutes)

#### Demo Flow:

1. **Homepage Overview** (20s)

   - Show the clean dashboard interface
   - Highlight network information panel with dynamic chain IDs
   - Point out the modern Mantine UI components

2. **Network Management** (30s)

   - Demonstrate network switching (testnet/mainnet/local)
   - Show how chain IDs update dynamically
   - Display real-time network status

3. **Account Management** (40s)

   - Navigate to Accounts page
   - Show account creation process
   - Display account information and balances

4. **Smart Contract Features** (30s)

   - Go to Contracts page
   - Show contract deployment wizard
   - Demonstrate contract templates

5. **Protocol Integrations** (40s)

   - Navigate to Protocols page
   - Show GinsenSwap DEX integration
   - Demonstrate Meson Bridge functionality
   - Highlight network-specific protocol availability

6. **DevKit Integration** (30s)
   - Show backend service running
   - Highlight real-time WebSocket updates
   - Demonstrate published package integration

```
Script for Demo Section:
"Let me show you Conflux Box in action.

First, here's our dashboard with a beautiful, modern interface. Notice the Network Information panel that dynamically shows the correct chain IDs based on the selected network - this was actually a bug we just fixed!

Watch as I switch between networks - you can see the chain IDs update automatically. For testnet, we see Core ID 1 and eVM ID 71, and for mainnet, Core ID 1029 and eVM ID 1030.

Moving to account management, you can easily create and manage development accounts. The interface is clean and provides all the information you need.

In the Contracts section, we have a powerful deployment wizard with pre-built templates. You can deploy contracts directly from the interface.

The Protocols section showcases real DeFi integration - here you can access GinsenSwap for DEX trading and Meson Bridge for cross-chain transfers. These integrations work on both testnet and mainnet, providing real utility to developers.

Everything is powered by the official Conflux DevKit packages, providing real-time updates through WebSocket integration."
```

### 4. Technical Implementation (60 seconds)

```
"Technically, Conflux Box is built with:

- React and TypeScript for type safety and modern development
- Mantine UI for beautiful, accessible components
- The official @conflux-devkit/node and @conflux-devkit/backend packages
- Real-time WebSocket integration for live updates
- Zustand and React Query for state management
- Comprehensive test suite with 14 passing tests

The key innovation is using the published DevKit packages, making this a reference implementation for how to build modern Conflux applications.

We overcame challenges in creating a seamless dual-chain experience and ensuring real-time synchronization with blockchain state."
```

### 5. Conclusion (30 seconds)

```
"Conflux Box represents the future of Conflux development - making blockchain development more accessible, modern, and enjoyable.

The project is open source and available on GitHub for the entire Conflux community to use and contribute to.

We believe this will help onboard more developers to the Conflux ecosystem by providing the tools they expect from modern development environments.

Thank you for watching, and we're excited to see what the community builds with Conflux Box!"
```

## 🎥 Recording Tips

### Before Recording

- [ ] **Test your setup** - Check audio and video quality
- [ ] **Prepare environment** - Clean background, good lighting
- [ ] **Practice the script** - Rehearse 2-3 times
- [ ] **Have application ready** - All networks configured and running
- [ ] **Create test data** - Sample accounts and contracts for demo

### During Recording

- [ ] **Speak clearly** - Moderate pace, clear pronunciation
- [ ] **Show, don't just tell** - Use the application actively
- [ ] **Smooth transitions** - Practice moving between sections
- [ ] **Handle errors gracefully** - Have backup plans
- [ ] **Stay within time limit** - Keep to 3-5 minutes

### Recording Checklist

- [ ] **Screen recording software** - OBS Studio, Loom, or similar
- [ ] **Audio quality** - Use good microphone, minimize background noise
- [ ] **Screen resolution** - Record at 1080p if possible
- [ ] **Application state** - Everything working and looking good
- [ ] **Backup recording** - Have a second recording just in case

## 🛠️ Technical Setup

### Screen Recording Options

1. **OBS Studio** (Free, professional)

   - Download from obsproject.com
   - Set up screen capture source
   - Configure audio input
   - Record in MP4 format

2. **Loom** (Easy to use)

   - Browser-based recording
   - Automatic hosting
   - Good for quick recordings

3. **QuickTime** (Mac users)
   - Built-in screen recording
   - Simple and reliable

### Application Setup for Demo

1. **Start backend service**

   ```bash
   node backend-service.js
   ```

2. **Start frontend in new terminal**

   ```bash
   npm run dev
   ```

3. **Prepare demo data**
   - Create 1-2 test accounts
   - Have contract templates ready
   - Ensure networks are responsive

### Quality Checklist

- [ ] **Video**: 720p minimum, 1080p preferred
- [ ] **Audio**: Clear, no background noise
- [ ] **Duration**: 3-5 minutes (strict limit)
- [ ] **Content**: Covers all required sections
- [ ] **Flow**: Smooth transitions between sections

## 📤 Upload Instructions

### Video File

- **Format**: MP4 (recommended)
- **Size**: Under 100MB preferred
- **Location**: Save to `/demo/video.mp4` in repository

### Hosting Options

1. **GitHub** - Direct file upload (if under 100MB)
2. **YouTube** - Create unlisted video, share link
3. **Vimeo** - Professional hosting option
4. **Google Drive** - Shareable link with public access

### Final Steps

- [ ] **Upload video** to chosen platform
- [ ] **Test the link** - Ensure it's publicly accessible
- [ ] **Add to submission** - Include link in hackathon submission
- [ ] **Backup copy** - Keep local copy safe

---

**Deadline**: Complete by September 12, 2025  
**Status**: 🔴 Not Started - HIGH PRIORITY
