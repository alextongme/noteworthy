# noteworthy
### Notes worthy for any moment.

noteworthy originally started as a clone of the popular note taking app, [Evernote](https://www.evernote.com), but quickly became its own unique app. Influenced by design aspects from Mattia Astorino's Material theme and functional aspects from Evernote's note taking editor, noteworthy is a new note editor designed to make your daily note taking activities a simple and visually pleasant experience. Document your thoughts and your life, with noteworthy.

<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/home.png?raw=true"/>
</p>

## Features
### User Account Signup/Login
- Users can create accounts to save their notes, notebooks & tags.
- Users can login (if they have an account) and retrieve their saved data. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/userAuth.gif?raw=true"/>
</p>

- Log out with ease. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/logout.gif?raw=true" />
</p>

- Visitors can also browse and see how the app works on a real account through the demo login button.

### Document with Notes
- Personalized welcome screen <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/loginSplash.png?raw=true" />
</p>
- Users can save notes and mark them down with specific formatting rules like indentation, fonts, sizes, colors, background colors, all with the click of one button.
- Users can also save photos, videos & links within each note. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/videosInEditor.gif?raw=true" />
</p>

### Organize by Notebooks
- Choose which notebook you would like to store your note in, each note needs to be in a notebook. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/makeNoteInSpecificNB.gif?raw=true" />
</p>
- Users can easily change which notebook they are creating a new note on using the dropdown menu in the sidebar.
- Easily view all of your notes in a specific notebook by visiting the notebook index page through the sidebar and selecting the arrow next to your desired notebook. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/expandNb.gif?raw=true" />
</p>
- View notes' content in depth by clicking on the notebook title in the notebooks index page.
- Delete and rename notebooks with ease, using the dropdown menu button on the notebooks index page, located on each notebook row. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/renameNb.gif?raw=true" />
</p>

- Navigation changes if user has 0 notebooks. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/noNotebooks.gif?raw=true" />
</p>

### Dark mode
- Easily switch between light and dark modes on the note editor, through the sidebar button, if your eyes need a rest or your writing creativity needs a bright boost. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/darkMode.gif?raw=true" />
</p>

### Organize by Tags
- Currently tags are only implemented on the demo login, and only existing tags and their corresponding notes can be viewed. <br></br>
<p align="center">
	<img width="800" src="https://github.com/tongsalex/noteworthy/blob/master/app/assets/images/readme_images/tags.gif?raw=true" />
</p>

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
