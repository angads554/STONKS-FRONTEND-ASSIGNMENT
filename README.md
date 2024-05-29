# Stonks Frontend Assignment

## Time Limit: 8 Hours

### Requirements

- Use only `Next.js` and `React` libraries.
- Tailwind CSS is accepted for styling.
- Ensure your code is clean; using custom hooks is a nice-to-have feature.

## Features

### 1. SSR Data-tables
- **Libraries Accepted:** Tanstack Table and Shadcn
- **Endpoint:** [https://665621609f970b3b36c4625e.mockapi.io/users](https://665621609f970b3b36c4625e.mockapi.io/users)
- **Documentation:** [MockAPI Docs](https://github.com/mockapi-io/docs/wiki)

**Requirements:**
- Create a server-side rendered table to fetch and display data.
- Pagination support: Users can navigate through pages using next and previous buttons or by pressing the page number.
- Search functionality: Users can search by email or username.
- URL rewriting with filters to handle SSR: pages, name, email, etc.

### 2. Chat
- Display all messages from users in a box.
- Highlight messages if you are tagged.
- Replace `:emoji:` text with the correct emoji image.
- **Note:** No backend required; use static content.

### 3. Emojis in Chat
- When a user starts to write an `:emoji:`, a popup/tooltip or panel of emojis will be shown.
- Users can select an emoji using the keyboard or mouse.

### 4. Tagging a User in Chat
- When a user starts to write an `@`, a list of users will be shown.
- If a user wants to tag `@edeuxk` but writes `@edxk`, the module should intelligently retrieve the `@edeuxk` (using regex or other methods).

### 5. Commands in Chat
- When a user starts writing `/`, a list of actions will be provided:
  - `/mute @user`
  - `/ban @user`
  - `/title` - Set a title for the current stream.
  - `/description` - Set a description for the current stream.
- **Note:** No backend required; just combine `/command` with `@tagging` a user in chat.

### Bonus Features

#### Modal
- Create an open dialog that fits every screen size, including resizing and scrolling inside.
- Close the modal when the user presses the escape key.
- **Library Accepted:** Shadcn

#### Profile Picture Upload/Edit
- Users can select a picture from disk file, resize it, and upload the selected area.
- Image compression to ensure it is less than 550KB.
- The selected image can be saved as `png`.
- Supported image formats: svg, png, jpeg.
- **Note:** Be aware of iOS storing images as `.heic`.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/stonks-frontend-assignment.git
    cd stonks-frontend-assignment
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```


