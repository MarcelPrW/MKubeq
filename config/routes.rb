Rails.application.routes.draw do
  devise_for :users, skip: 'registration'

  root to: 'homepage#show'
  get  '/order',              to: 'homepage#order'
  get  '/about',              to: 'homepage#about'
  get  '/policy',             to: 'homepage#policy'
  post '/contact',            to: 'homepage#contact'
  post '/process_order',      to: 'homepage#process_order'

  post '/calculate',          to: 'calculate#upload'
  post '/calculate/quality',  to: 'calculate#calculate'
end
