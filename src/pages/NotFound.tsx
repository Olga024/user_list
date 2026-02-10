import { HomeOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Result from "antd/es/result"

export const NotFound = () => {
  return <Result
    status="404"
    title="Страница не найдена"
    subTitle="Похоже, страница, которую Вы ищете, отсутствует."
    extra={
      <Button type="primary" href="/">
        <HomeOutlined /> Вернуться домой
      </Button>
    }/>
  }