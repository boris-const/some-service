
import React from "react";
import { Flex, Modal, Typography } from "antd";


interface Props {
  open: boolean;
  onCancel: () => void;
}

const { Title } = Typography;


const InfoModal: React.FC<Props> = ({ open, onCancel }) => {
  

  return (
    <Modal
      open={open}
      title="Инструкция"           
      onCancel={onCancel}
      destroyOnClose
      onOk={onCancel}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}     
      width={770}
    >
      <Flex gap={20}>
        <div>
          <Title level={5}>Deposid</Title>
          <Flex gap={5} style={{marginTop: 15, flexDirection: "column"}}>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Депозит получен</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#EAD61B",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Процесс обработки</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Депозит не получен</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "gray",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Нет данных</Typography>
            </Flex>
          </Flex>
        </div>
        <div>
          <Title level={5}>AML</Title>
          <Flex gap={5} style={{marginTop: 15, flexDirection: "column"}}>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Проверка прошла</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#EAD61B",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Идет проверка</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Проверка не пройдена</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "gray",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Нет данных</Typography>
            </Flex>
          </Flex>
        </div>
        <div>
          <Title level={5}>Процесс обмена</Title>
          <Flex gap={5} style={{marginTop: 15, flexDirection: "column"}}>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Обмен прошел</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#EAD61B",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Идет проверка</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Обмен не пройден</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "gray",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Нет данных</Typography>
            </Flex>
          </Flex>
        </div>
        <div>
          <Title level={5}>Вывод средств</Title>
          <Flex gap={5} style={{marginTop: 15, flexDirection: "column"}}>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Вывод прошел</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#EAD61B",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Идет вывод</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Вывод не прошел</Typography>
            </Flex>
            <Flex gap={7}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "gray",
                  borderRadius: "50%",
                }}
              ></div>
              <Typography>Нет данных</Typography>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Modal>
  );
};

export default InfoModal;

