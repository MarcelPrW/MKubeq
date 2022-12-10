class CalculateController < ApplicationController
  def upload
    new_file_name = UploadService.new(params).upload
    render json: { filename: new_file_name }
  end

  def calculate
    output = CalculateService.new(params).node_stl_calculate
    render json: output
  end

  private

  def calculate_permitted_params
    params.permit(:quality, :filename, :color)
  end
end
