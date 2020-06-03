# extract only secured info from the user route using jbuilder

json.extract! user, :id, :username, :email, :first_name, :last_name
