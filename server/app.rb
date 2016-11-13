require 'sinatra'
require 'sqlite3'
require 'json'
require 'pry'
require './lib/pic'
require './lib/post'
require './lib/oldpost'
require './lib/user'
require './lib/connection'
require 'active_record'
require 'bcrypt'
include FileUtils::Verbose
set :sessions, secret: 'ahsjvi'
set :public_folder, './public'

#landing page for user
get '/' do
	puts '/'
	send_file File.join(settings.public_folder, 'user.html')
end
# get '/admin' do
# 	puts 'XXX admin'
# 	send_file File.join(settings.public_folder, 'admin.html')	
# end
# get '/public/admin.js' do
# 	send_file File.join(settings.public_folder, 'admin.js')
# end
get '/public/user.js' do
	send_file File.join(settings.public_folder, 'user.js')
end
#press page
get '/presskit.html' do
	puts '/presskit.html'
	send_file File.join(settings.public_folder, 'presskit.html')
end

get '/press.html' do
	puts '/press.html'
	send_file File.join(settings.public_folder, 'presskit.html')
end
#respond to ajax for carousel
get '/pics' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'
	content_type :json
	pics = Pic.order(:carousel)
	pics.to_json
end

#news ajax
get '/news' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'
	content_type :json
	news = Post.where("section = ?", "news").reverse_order
	news.to_json
end

#shows ajax
get '/shows' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'	
	content_type :json
	shows = Post.where("section = ? AND eventdate > ?", "shows", Time.now).order(:eventdate)
	shows.to_json
end

#press ajax
get '/press' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'	
	content_type :json
	press = Post.where("section = ?", "press").reverse_order
	press.to_json
end

#video ajax
get '/videos' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'
	content_type :json
	video = Post.where("section = ?", "videos").reverse_order
	video.to_json
end

#contact ajax
get '/contact' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'	
	content_type :json
	contact = Post.where("section = ?", "contact").reverse_order
	contact.to_json
end

get '/store' do
	headers 'Access-Control-Allow-Origin' => '*'
	headers 'Access-Control-Allow-Methods' => 'GET'	
	content_type :json
	store = Post.where("section = ?", "store").reverse_order
	store.to_json
end

# does what it says
def authenticated?
	session[:valid_user] == true
end












# get '/admin' do
# 	if authenticated?
# 		pics = Pic.all()
# 		erb :"admin/admin", locals: {pics: pics}
# 	else
# 		redirect '/admin/login'
# 	end
# end



get '/admin' do
	puts 'XXXXX /admin'
	if authenticated?
		puts "XXXXX is authenticated"
		send_file File.join(settings.public_folder, 'admin.html')
	else
		puts "XXXXX is not authenticated"
		redirect '/admin/login'
	end	
end
# log in
get '/admin/login' do
	puts "XXXXXX admin/login"
	send_file File.join(settings.public_folder, "admin/login.html")
end

#create a user
post '/admin/user' do
	puts "XXXXX admin/user"
	if params[:password] != params[:pass_confirm]
		puts "XXXXX pass is wrong"
		redirect '/admin/login'
	else
		puts "XXXXX pass worked"
		pass = BCrypt::Password.create(params[:password])
		session[:valid_user] = true
		User.create(name: params[:name], password_digest: pass)
		redirect '/admin'
	end
end

#actually log in
post '/admin/session' do
	puts "XXXXX admin/session"
	user = User.find_by(name: params[:name])
	if user
		if BCrypt::Password.new(user.password_digest) == params[:password]
			session[:valid_user] = true
			redirect '/admin'
		else
			redirect '/admin/login'
		end
	else
		redirect '/admin/login'
	end
end

# CRUD pics
get '/admin/pics' do
	puts session[:valid_user]
	if authenticated?
		puts "GET ADMIN/PICS"
		pics = Pic.order(:carousel)
		redirect '/admin'
	else
		redirect '/admin/login'
	end
end

# upload a pic, save the file in public, and add the url and carousel status to the pics table
post '/admin/pic' do
	if authenticated?
		puts "POST ADMIN/PIC"

		if params[:carousel_selection]
			car = params[:carousel_selection]
		else car = 0
		end
		tempfile = params[:file][:tempfile] 
		filename = params[:file][:filename].gsub(" ", "_")
		cp(tempfile.path, "./public/#{filename}")
		Pic.create(url: filename, carousel: car)
		redirect '/admin'
	else
		redirect '/admin/login'
	end
end

# update carousel status of each pic
put '/admin/pics' do
	if authenticated?
		newpics = JSON.parse(params[:pics])

		
		newpics.each do |newpic|
			
			puts "XXXXX"
			puts newpic
			pic = Pic.find_by(id: newpic["id"])
			pic.update(carousel: newpic["carousel"])
			end
		
		redirect '/admin/pics'
	else
		redirect '/admin/login'
	end
end

put '/admin/pic/:id' do
	if authenticated?
		pic = Pic.find_by(id: params[:id].to_i)
		pic.update(carousel: params[:carousel])
		redirect '/admin/pics'
	else
		redirect '/admin/login'
	end
end
# show an individual pic
get '/admin/pic/:id' do
	if authenticated?
		pic = Pic.find_by(id: params[:id])
		erb :"admin/pic", locals: {pic: pic}
	else
		redirect '/admin/login'
	end
end

#DESTROY!
delete '/admin/pic/:id' do
	if authenticated?
		pic = Pic.find_by(id: params[:id])
		filename = pic.url
		pic.delete
		File.delete("./public/#{filename}")
		redirect '/admin/pics'
	else
		redirect '/admin/login'
	end
end

#CRUD posts
get '/admin/posts' do
	if authenticated?
		posts = Post.all()
		erb :"admin/posts", locals: {posts: posts}
	else
		redirect '/admin/login'
	end
end

#show individual post
get '/admin/post/:id' do
	if authenticated?
		post = Post.find_by(id: params[:id])
		pics = Pic.all()
		erb :"admin/post", locals: {post: post, pics: pics}
	else
		redirect '/admin/login'
	end
end

#update post
put '/admin/post' do
	if authenticated?
		puts params
		post = Post.find_by(id: params[:id].to_i)
		post.update(title: params[:title], story: params[:story], section: params[:section])
		redirect '/admin'
	else
		redirect '/admin/login'
	end
end

#create post
post '/admin/post' do
	if authenticated?

		if params[:section] == "shows"
			expire = params[:date] + " 23:59:00"
			Post.create(title: params[:title], story: params[:story], section: params[:section], eventdate: expire)
					
			redirect '/admin'
		else params[:section]
			Post.create(title: params[:title], story: params[:story], section: params[:section])
			redirect '/admin'
		end
	else
		redirect '/admin/login'
	end
end

#archive deleted post, delete post in regular post table
delete '/admin/post' do
	if authenticated?
		post = Post.find_by(id: params[:id])
		post.delete
		redirect '/admin'
	else
		redirect '/admin/login'
	end
end

delete '/admin/logout' do
	session[:valid_user] = false
	redirect '/admin'
end

get '/admin/logout' do
	session[:valid_user] = false
	redirect '/admin'
end

#landing page for admin
get '/admin' do
	if authenticated?
		pics = Pic.all()
		erb :"admin/admin", locals: {pics: pics}
	else
		redirect '/admin/login'
	end
end

get '/pic_window' do
	if authenticated?
		pics = Pic.all()
		erb :"admin/pic_window", locals: {pics: pics}
	else
		redirect '/admin/login'
	end
end