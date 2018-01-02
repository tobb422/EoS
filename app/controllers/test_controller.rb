class TestController < ApplicationController
	def index
		render json: 'Hello'
	end
end
