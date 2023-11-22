import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  DateRangePicker,
  Button,
  Flex,
  Text,
} from "@tremor/react";
import React from "react";
import axios from "axios";
import moment from "moment";

const SensorLogs = () => {
  // Sort
  const [dateSorted, setDateSorted] = React.useState(1)

  // Pagination handler
  const [currentPage, setCurrentPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)

  // Lấy tổng số trang
  React.useEffect(() => {
    axios.get("http://localhost:5678/api/total_pages_sensors")
      .then(res => setTotalPages(res.data))
      .catch(err => console.log(err))
  }, [])

  // Các hàm để sang trang
  const handleNextPage = async () => {
    if (date && currentPage < totalPages) {
      if (date.from && date.to) {
        await axios.get("http://localhost:5678/api/list_sensors", {
          params: {
            date_from: date.from,
            date_to: date.to,
            page: currentPage + 1,
            sorted: dateSorted
          }
        }).then(res => {
          setData(res.data)
          setCurrentPage(currentPage + 1)
        }).catch(error => console.log(error))
      } else {
        await axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage + 1}&sorted=${dateSorted}`
        ).then(res => {
          console.log(res.data);
          setData(res.data)
          setCurrentPage(currentPage + 1)
        }).catch(error => console.log(error))
      }
    }
  }
  const handlePrevPage = async () => {
    if (date && currentPage > 0) {
      if (date.from && date.to) {
        await axios.get("http://localhost:5678/api/list_sensors", {
          params: {
            date_from: date.from,
            date_to: date.to,
            page: currentPage - 1,
            sorted: dateSorted
          }
        }).then(res => {
          setData(res.data)
          setCurrentPage(currentPage - 1)
        }).catch(error => console.log(error))
      } else {
        await axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage - 1}&sorted=${dateSorted}`
        ).then(res => {
          setData(res.data)
          setCurrentPage(currentPage - 1)
        }).catch(error => console.log(error))
      }
    }
  }
  const handleLastPage = async () => {
    if (date && currentPage < totalPages) {
      if (date.from && date.to) {
        await axios.get("http://localhost:5678/api/list_sensors", {
          params: {
            date_from: date.from,
            date_to: date.to,
            page: totalPages,
            sorted: dateSorted
          }
        }).then(res => {
          setData(res.data)
          setCurrentPage(totalPages)
        }).catch(error => console.log(error))
      } else {
        await axios.get(`http://localhost:5678/api/list_sensors?page=${totalPages}&sorted=${dateSorted}`
        ).then(res => {
          setData(res.data)
          setCurrentPage(totalPages)
        }).catch(error => console.log(error))
      }
    }
  }
  const handleFirstPage = async () => {
    if (date && currentPage > 0) {
      if (date.from && date.to) {
        await axios.get("http://localhost:5678/api/list_sensors", {
          params: {
            date_from: date.from,
            date_to: date.to,
            page: 0,
            sorted: dateSorted
          }
        }).then(res => {
          setData(res.data)
          setCurrentPage(0)
        }).catch(error => console.log(error))
      } else {
        await axios.get(`http://localhost:5678/api/list_sensors?page=0&sorted=${dateSorted}`
        ).then(res => {
          setData(res.data)
          setCurrentPage(0)
        }).catch(error => console.log(error))
      }
    }
  }

  // Data
  const [data, setData] = React.useState([])
  const [date, setDate] = React.useState({
    from: undefined,
    to: undefined,
  });

  // Lấy data
  // Khi vừa vào page lần đầu thì sẽ lấy data ở trang 1 và sắp xếp từ ngày gần nhất đến xa nhất
  React.useEffect(() => {
    axios.get(`http://localhost:5678/api/list_sensors?page=${currentPage}&sorted=${dateSorted}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])

  // Lấy data khi click vào Search theo khoảng thời gian
  const handleClickSearch = async () => {
    // Kiểm tra nếu có khoảng thời gian được chọn thì lấy data
    if (date && date.from && date.to) {
      await axios.get("http://localhost:5678/api/list_sensors", {
        params: {
          date_from: date.from,
          date_to: date.to,
          page: 0,
          sorted: dateSorted
        }
      }).then(res => {
        setData(res.data)
        setCurrentPage(0)
      }).catch(error => console.log(error))

      await axios.get("http://localhost:5678/api/total_pages_sensors", {
        params: {
          date_from: date.from,
          date_to: date.to,
          sorted: dateSorted
        }
      }).then(res => {
        setTotalPages(res.data)
      }).catch(error => console.log(error))
    } else {
      // Nếu thiếu 1 trong 2 ngày bắt đầu hoặc ngày kết thúc thì báo lỗi
      window.alert("Please pick 2 dates");
    }
  }

  // Sắp xếp data theo ngày
  const handleSortByDate = async () => {
    if (date && date.from && date.to) {
      await axios.get("http://localhost:5678/api/list_sensors", {
        params: {
          date_from: date.from,
          date_to: date.to,
          page: currentPage,
          sorted: 1 - dateSorted
        }
      }).then(res => {
        setData(res.data)
        setDateSorted(1 - dateSorted)
      }).catch(error => console.log(error))
    } else {
      await axios.get("http://localhost:5678/api/list_sensors", {
        params: {
          page: currentPage,
          sorted: 1 - dateSorted
        }
      }).then(res => {
        setData(res.data)
        setDateSorted(1 - dateSorted)
      }).catch(error => console.log(error))
    }
  }
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-16 xl:py-12">
      <header className="ie-as-header flex w-full justify-between">
        <h3 className="text-xl font-semibold text-gray-900">All Sensor Logs</h3>
      </header>
      <div className="ie-as-content mt-5">
        <Card>
          {/* Input chọn khoảng thời gian */}
          <Flex justifyContent="center" className="gap-2">
            <DateRangePicker
              className=""
              value={date}
              onValueChange={setDate}
            />
            <Button size="xs" variant="secondary" icon={MagnifyingGlassIcon} onClick={handleClickSearch}> Search </Button>
          </Flex>
          {/* Table hiện dữ liệu của bảng Actions */}
          <Table className="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Temperature</TableHeaderCell>
                <TableHeaderCell>Humidity</TableHeaderCell>
                <TableHeaderCell>Light</TableHeaderCell>
                <TableHeaderCell>
                  <Button variant="light" color='stone' icon={ChevronUpDownIcon} iconPosition="right" onClick={handleSortByDate}>
                    Created At
                  </Button>
                </TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge size="xs" color="sky">{item.id}</Badge>
                  </TableCell>
                  <TableCell>{item.temperature}</TableCell>
                  <TableCell>{item.humidity}</TableCell>
                  <TableCell>{item.light}</TableCell>
                  <TableCell>{moment(item.time).format('DD/MM/YY HH:mm:ss')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="h-2" />
          {/* Các nút để sang trang */}
          <Flex className="justify-end">
            <Button variant="light" className="rounded p-1" icon={ChevronDoubleLeftIcon} onClick={handleFirstPage} disabled={currentPage <= 0} />
            <Button variant="light" className="rounded p-1" icon={ChevronLeftIcon} onClick={handlePrevPage} disabled={currentPage <= 0} />
            <span className="flex items-center gap-1 mx-4">
              <Text>Page</Text>
              <Text>
                {currentPage + 1} of{" "}
                {totalPages + 1}
              </Text>
            </span>
            <Button variant="light" className="rounded p-1" icon={ChevronRightIcon} onClick={handleNextPage} disabled={currentPage >= totalPages} />
            <Button variant="light" className="rounded p-1" icon={ChevronDoubleRightIcon} onClick={handleLastPage} disabled={currentPage >= totalPages} />
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SensorLogs;