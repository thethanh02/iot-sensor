import axios from 'axios'
import { config } from './Constants'

export const Api = {
  get10SensorsLastest,
  getTotalPagesSensors,
  getSensors,
  getTotalPagesActions,
  getActions,
  saveAction
}

function get10SensorsLastest() {
  return instance.get(`/api/lastest_sensors`)
}
function getTotalPagesSensors(date) {
  const params = (date?.from && date?.to) ? { date_from: date.from, date_to: date.to } : {};
  return instance.get(`/api/total_pages_sensors`, { params: params })
}
function getSensors(date, currentPage, dateSorted) {
  const params = {
    page: currentPage,
    sorted: dateSorted
  };

  if (date?.from && date?.to) {
    Object.assign(params, {
      date_from: date.from,
      date_to: date.to
    });
  }

  return instance.get(`/api/list_sensors`, {
    params: params
  });
}
function getTotalPagesActions(date) {
  const params = (date?.from && date?.to) ? { date_from: date.from, date_to: date.to } : {};
  return instance.get(`/api/total_pages_actions`, { params: params });
}
function getActions(date, currentPage, dateSorted) {
  const params = {
    page: currentPage,
    sorted: dateSorted
  };

  if (date?.from && date?.to) {
    Object.assign(params, {
      date_from: date.from,
      date_to: date.to
    });
  }
  return instance.get(`/api/list_actions`, {
    params: params
  })
}
function saveAction(action) {
  return instance.post(`/api/action/save`, action)
}

// -- Axios
const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})