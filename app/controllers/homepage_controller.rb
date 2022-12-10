class HomepageController < ApplicationController
  
  def contact
    @order = Order.create(order_params)
    ContactMailer.contact_email(@order).deliver_now
    render json: @order
  end

  def order
    if params[:orderHash].blank?
      redirect_to root_url
    end
  end

  def process_order
    @order = Order.create(order_params)
    ContactMailer.order_email(@order).deliver_now
    render json: @order
  end

  private

  def order_params
    params.permit(:name, :surname, :address, :phone, :email, :filename, :info, :color, :quality, :calculation, :consent_copy)
  end
end
