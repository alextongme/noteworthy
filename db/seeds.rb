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
    },
    {
        username: 'alex', 
        password: '123456', 
        email: 'alex@gmail.com',
        first_name: 'alex',
        last_name: 'tong'
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
        body: 'Consequat esse dolore minim eiusmod ut. Consequat qui dolor nisi veniam do duis id excepteur aliqua cupidatat. Quis aute sunt velit cillum consectetur elit est pariatur. Sint reprehenderit laboris fugiat aute est ullamco adipisicing minim incididunt ex.'
    },
    {
        title: 'my first note in notebook 2',
        body: 'Amet Lorem aute enim ex excepteur adipisicing ullamco cillum sunt excepteur proident incididunt est culpa. Laboris quis minim cillum mollit. Aliquip nulla cillum dolore ullamco. Ea laboris consequat amet esse Lorem ullamco eu laboris incididunt. Non amet occaecat ullamco dolore dolor laborum sunt id magna culpa et voluptate officia aliquip. Culpa pariatur sit incididunt nisi consectetur ea dolor. Consequat magna veniam qui non voluptate qui officia esse adipisicing enim.'
    },
    {
        title: 'my second note in notebook 1',
        body: 'Laboris occaecat sit excepteur non culpa ipsum culpa do aliquip labore do. Amet esse aliquip officia aliquip sint cupidatat officia nostrud qui. Enim deserunt mollit minim eiusmod ut veniam minim elit anim commodo. Eiusmod velit officia non consequat excepteur irure dolor voluptate dolor. Labore elit qui nulla est duis id aliqua do officia exercitation do non ullamco culpa.'
    },
    {
        title: 'my first note in notebook 3',
        body: 'Velit quis dolor officia laboris culpa qui. Duis velit culpa fugiat aute laborum tempor id. Consequat excepteur Lorem adipisicing magna cillum Lorem elit sit amet aliqua pariatur laborum in ut. Minim magna sit in quis irure eu proident cillum. Adipisicing velit consectetur consequat reprehenderit consectetur magna. Aute amet adipisicing voluptate qui. Incididunt cillum nisi et aliqua excepteur culpa fugiat aliquip.'
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

# Tag.create!(
#     {
#         name: 'appAcademy',
#     }
# )