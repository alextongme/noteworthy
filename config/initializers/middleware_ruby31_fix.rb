# Fix middleware stack keyword argument handling for Ruby 3.0+
#
# In Ruby 3.0+, keyword arguments are fully separated from positional
# arguments. The middleware stack stores kwargs as a trailing hash in
# the args array, then splats them back as positional args in #build.
# This causes "wrong number of arguments" errors for middleware that
# uses keyword arguments (e.g. ActionDispatch::Static).
if RUBY_VERSION >= "3.0"
  module ActionDispatch
    class MiddlewareStack
      class Middleware
        def build(app)
          if args.last.is_a?(Hash)
            klass.new(app, *args[0..-2], **args.last, &block)
          else
            klass.new(app, *args, &block)
          end
        end
      end
    end
  end
end
