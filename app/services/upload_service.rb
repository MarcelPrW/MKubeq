class UploadService
  def initialize(params)
    @file = params[:model]
  end

  def upload
    file_io = @file
    new_file_name = "#{SecureRandom.uuid}.stl"
    path = Rails.root.join('public', 'uploads', new_file_name)
    save_file(path, file_io)
    Calculation.create(
      original_filename: @file.original_filename,
      filename: new_file_name
    )
    new_file_name
  end

  private

  def save_file(path, stream)
    File.open(path, 'wb') do |file|
      file.write(stream.read)
    end
  end
end
