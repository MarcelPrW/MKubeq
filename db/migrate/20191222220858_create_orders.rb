class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :name
      t.string :surname
      t.text :address
      t.string :phone
      t.string :email
      t.string :filename
      t.text :info
      t.string :color
      t.string :quality
      t.text :calculation

      t.timestamps
    end
  end
end
