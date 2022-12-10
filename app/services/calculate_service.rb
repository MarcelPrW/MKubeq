class CalculateService
  def initialize(params)
    @quality = params[:quality]
    @filename = params[:filename]
    @color = params[:color]
  end

  def node_stl_calculate
    calculation = Calculation.find_by(filename: @filename)
    calculation.quality = @quality
    calculation.color = @color
    calculation.save
    output = `node calculate.js #{@quality} #{@filename} #{@color}`

    JSON.parse(output)
  end
end
