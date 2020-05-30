# this will serve as the entry point of the root route, which will serve the HTML for the entire

class StaticPagesController < ApplicationController
    def root
        render :root
    end
end