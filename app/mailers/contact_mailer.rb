class ContactMailer < ApplicationMailer
  def contact_email(order)
    @order = order
    mail(to: "kontakt@3d-mkubek.pl,adrian.wojdat@gmail.com,marcel.wojdat9@gmail.com", subject: "3d-mkubek - Kontakt - #{order.email}")
  end

  def order_email(order)
    @order = order
    mail(to: "kontakt@3d-mkubek.pl,adrian.wojdat@gmail.com,marcel.wojdat9@gmail.com", subject: "3d-mkubek - Zamówienie - #{order.email}")
  end
end
