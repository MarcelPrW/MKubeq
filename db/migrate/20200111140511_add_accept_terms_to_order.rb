class AddAcceptTermsToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :consent_copy, :boolean, default: false
  end
end
