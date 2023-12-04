import React, { useState, useEffect } from "react"
import axios from "axios"
const TOKEN = "6689250015:AAG3f4IifKknOM6IZpkyYp5hKnMjyYajl70"
const YourComponent = () => {
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `https://api.telegram.org/bot${TOKEN}/getUpdates`
                )

                // Проверка статуса ответа
                if (response.status !== 200) {
                    throw new Error("Network response was not ok")
                }
                const jsonData =
                    response.data.result.length > 1
                        ? response.data.result
                        : "not-found"
                // Фильтрация объектов, оставляя только те, у которых значение chat.id равно -4086368713
                console.log(jsonData)
                let data
                if (jsonData !== "not-found") {
                    data = jsonData.filter(
                        (obj) =>
                            obj.message &&
                            obj.message.chat &&
                            obj.message.chat.id === -1002107131333
                    )
                    setFilteredData(data)
                }

                // Обновление состояния с отфильтрованными объектами
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <h1>Filtered Data:</h1>
            <ul>
                {filteredData.map((obj, index) => (
                    <>
                        <li key={index}>
                            <p>ID: {obj.message.chat.id}</p>
                            <p>Message: {obj.message.text}</p>
                            <p>
                                Link:{" "}
                                <a
                                    target="_blank"
                                    href={`https://t.me/c/${-1002107131333}/${
                                        obj.message.message_id
                                    }`}
                                    rel="noreferrer"
                                >
                                    Ссылка
                                </a>
                            </p>
                        </li>
                        <hr />
                    </>
                ))}
            </ul>
        </div>
    )
}

export default YourComponent
