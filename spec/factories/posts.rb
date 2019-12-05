FactoryBot.define do
  factory :post do
    place_name          { "Tokyo Dome" }
    title               { "This is a sample title written by factory_bot" }
    body                { "This is a sample title. It should be about a particular place where user visited." }
    visit_date          { Date.new(2019) }
    user
    place
  end
end
