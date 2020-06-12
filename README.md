# noteworthy
Notes worthy for any moment.

noteworthy originally started as a clone of the popular note taking app, [Evernote](https://www.evernote.com).

## Features
### User Account Signup/Login
- Users can create accounts to save their notes, notebooks & tags. 
- Users can login and retrieve their saved data.
- Visitors can also browse and see how the app works on a real account through the demo login button.

### Document with Notes
- Users can save notes and mark them down with specific formatting rules like indentation, fonts, sizes, colors, background colors, all with the click of one button.
- Users can also save photos, videos & links within each note.

### Organize by Notebooks
- Choose which notebook you would like to store your note in, each note needs to be in a notebook. 
- Users can easily change which notebook they are creating a new note on using the dropdown menu in the sidebar.
- Easily view all of your notes in a specific notebook by visiting the notebook index page through the sidebar and selecting the arrow next to your desired notebook.
- View notes' content in depth by clicking on the notebook title in the notebooks index page.
- Delete and rename notebooks with ease, using the dropdown menu button on the notebooks index page, located on each notebook row.

### Dark mode
- Easily switch between light and dark modes on the note editor, through the sidebar button, if your eyes need a rest or your writing creativity needs a bright boost.

### Organize by Tags
- Currently tags are only implemented on the demo login, and only existing tags and their corresponding notes can be viewed.

## Featured Technologies Used
- React Quill
  - noteworthy uses the beautiful rich text editor, React Quill to markdown notes, which alllows users to save their notes with specific formatting rules so that their notes look exactly the way they want them to when they come back. React Quill and noteworthy allow users to save more than just text; videos, pictures & links are all savable filetypes.
- React Typist
  - On our landing page, in order to animate the title screen, I utilized the React Typist package to give the impression to the user that another person was typing on the screen.
- Javascript Time Ago
  - For documenting how "long ago," your note was last updated, I fed each note's `updated at` timestamp to the Javascript Time Ago technology to give users a more pleasant and readable timestamp.
  
## Major Technologies Used
- React
- React Router
- Redux
- Ruby on Rails
- PostgreSQL
- Bcrypt
