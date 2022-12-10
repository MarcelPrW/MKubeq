class CreateCalculations < ActiveRecord::Migration[6.0]
  def change
    create_table :calculations do |t|
      t.string :filename
      t.string :original_filename
      t.integer :quality
      t.string :color

      t.timestamps
    end
  end
end
