class Rack::Attack
  throttle("req/ip", limit: 200, period: 5.minutes, &:ip)
end
