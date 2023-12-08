const prod = {
  url: {
      API_BASE_URL: 'https://iot-sensor.vercel.app'
  }
}

const dev = {
  url: {
      API_BASE_URL: 'http://localhost:5678'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod