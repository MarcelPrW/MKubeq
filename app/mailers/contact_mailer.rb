class ContactMailer < ApplicationMailer
  def contact_email(order)
    @order = order
    mail(to: "marcel.wojdat9@gmail.com", subject: "mKubek - Kontakt - #{order.email}")
  end

  def order_email(order)
    @order = order
    mail(to: "marcel.wojdat9@gmail.com", subject: "mKubek - Zamówienie - #{order.email}")
  end
end
