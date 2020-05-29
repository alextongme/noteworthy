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
UserNotebook.delete_all
Notebook.delete_all

User.create!(
    [{
        username: 'demo', 
        password: '123456', 
        email: 'demo@gmail.com'
    },
    {
        username: 'alex', 
        password: '123456', 
        email: 'alex@gmail.com'
    }]
)


Notebook.create!(
    {
        name: 'my first notebook'
    }
)

UserNotebook.create!(
    {
        user_id: 1,
        notebook_id: 1,
        shortcut: false
    }
)
