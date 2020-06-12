# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ActiveRecord::Base.establish_connection
ActiveRecord::Base.connection.tables.each do |table|
  next if table == 'schema_migrations'

  ActiveRecord::Base.connection.execute("TRUNCATE #{table}")
  ActiveRecord::Base.connection.reset_pk_sequence!("#{table}")
end

User.delete_all
Notebook.delete_all
UserNotebook.delete_all
Note.delete_all
UserNote.delete_all
NotebookNote.delete_all

User.create!(
    [{
        username: 'demo', 
        password: '123456', 
        email: 'demo@gmail.com',
        first_name: 'demo',
        last_name: 'greatest',
        default_notebook_id: 1
    }]
)


Notebook.create!(
    [
        {name: 'my first notebook'}, #1
        {name: 'my 2 notebook'}, #2
        {name: 'my 3 notebook'},
    ]
)

UserNotebook.create!(
    [
        {user_id: 1, notebook_id: 1},
        {user_id: 1, notebook_id: 2},
        {user_id: 1, notebook_id: 3},
    ]
)

Note.create!(
    [{
        title: 'my first note in notebook 1',
        body: '<p><u class="ql-font-monospace ql-size-huge" style="color: rgb(0, 138, 0); background-color: rgb(0, 41, 102);">“The Old Pond” by Matsuo Bashō</u></p><p><em style="background-color: initial;" class="ql-font-serif ql-size-large">An old silent pond</em></p><p><span class="ql-size-huge" style="background-color: initial;">A frog jumps into the pond—</span></p><p><em style="background-color: initial;" class="ql-font-monospace ql-size-large">Splash! Silence again.</em></p><p><br></p>'
    },
    {
        title: 'my first note in notebook 2',
        body: '<p><a href="www.tongsalex.com" rel="noopener noreferrer" target="_blank">Laboris occaecat sit excepteur non culpa ipsum culpa do aliquip labore do. Amet esse aliquip officia aliquip sint cupidatat officia nostrud qui. Enim deserunt mollit minim eiusmod ut veniam minim elit anim commodo. Eiusmod velit officia non consequat excepteur irure dolor voluptate dolor. Labore elit qui nulla est duis id aliqua do officia exercitation do non ullamco culpa.</a></p>'
    },
    {
        title: 'my second note in notebook 1',
        body: '<ol><li><span class="ql-font-monospace ql-size-large">Consequat esse dolore minim </span></li><li><span class="ql-font-monospace ql-size-large">eiusmod </span></li><li><span class="ql-font-monospace ql-size-large">ut. </span></li><li><br></li></ol><ul><li><span class="ql-font-monospace ql-size-large">Consequat qui dolor nisi veniam do duis id </span></li><li><span class="ql-font-monospace ql-size-large">excepteur aliqua cupidatat. Quis aute sunt velit cillum consectetur elit est pariatur. Sint reprehenderit laboris fugiat aute est ullamco adipisicing minim incididunt ex.</span></li></ul><p><br></p><p><br></p><p><br></p><pre class="ql-syntax" spellcheck="false">&lt;div&gt;this is a code block!&lt;/div&gt;+'
    },
    {
        title: 'my first note in notebook 3',
        body: '<p><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/OMkEVX23BdM?showinfo=0"></iframe><p><br></p>'
    }
]
)

NotebookNote.create!(
    [{
        note_id: 1,
        notebook_id: 1,
    },
    {
        note_id: 2,
        notebook_id: 2,
    },
    {
        note_id: 3,
        notebook_id: 1,
    },
    {
        note_id: 4,
        notebook_id: 3,
    }
]
)

UserNote.create!(
    [{
        user_id: 1,
        note_id: 1
    },
    {
        user_id: 1,
        note_id: 2
    },
    {
        user_id: 1,
        note_id: 3
    },
    {
        user_id: 1,
        note_id: 4
    }
]
)

Tag.create!(
    [{
        name: 'App Academy',
        author_id: 1
    },
    {
        name: 'Lions',
        author_id: 1
    },
    {
        name: 'Redux',
        author_id: 1
    },
    {
        name: 'Tigers',
        author_id: 1
    },
    {
        name: 'React',
        author_id: 1
    },
    {
        name: 'Rails',
        author_id: 1
    },
    {
        name: 'Ruby',
        author_id: 1
    },
    {
        name: 'Ruby on Redux',
        author_id: 1
    }]
)

NoteTag.create!(
    [{
        note_id: 1,
        tag_id: 1
    },
    {
        note_id: 2,
        tag_id: 2
    },
    {
        note_id: 1,
        tag_id: 3
    },
    {
        note_id: 2,
        tag_id: 1
    },
    {
        note_id: 3,
        tag_id: 4
    },
    {
        note_id: 4,
        tag_id: 4
    },
    {
        note_id: 4,
        tag_id: 5
    },
]
)