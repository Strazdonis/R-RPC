function Initialize()

   measureGetActives = SKIN:GetMeasure('MeasureGetActives')

end

function Update()

   siteData = measureGetActives:GetStringValue()

   tempVar, activesCount = string.gsub(siteData, 'Active=1', "temp")

   return (activesCount-1)

end
