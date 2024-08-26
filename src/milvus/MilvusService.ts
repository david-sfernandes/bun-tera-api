import prisma from "../lib/prisma";

class MilvusService {
  private readonly BASE_URL = "https://apiintegracao.milvus.com.br/api";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getDevices(page?: number) {
    const path =
      "/dispositivos/listagem?total_registros=1000&order_by=id&is_descending=false";
    const url = `${this.BASE_URL}${path}${page ? `&page=${page}` : ""}`;

    const milvusDevices: { lista: MilvusDevice[] } = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: this.apiKey,
      },
    }).then((res) => res.json());
    return milvusDevices.lista;
  }

  async getClients() {
    const url = `${this.BASE_URL}/cliente/busca`;

    const milvusClients: { lista: MilvusClient[] } = await fetch(url, {
      headers: {
        Authorization: this.apiKey,
      },
    }).then((res) => res.json());
    return milvusClients.lista;
  }

  async syncDevices() {
    const milvusDevices = await this.getDevices();

    const devices = await prisma.device.createMany({
      data: milvusDevices.map((device) => ({
        id: device.id,
        name: device.hostname,
        nickname: device.apelido,
        brand: device.marca,
        last_update: device.data_ultima_atualizacao,
        mac: device.macaddres,
        model: device.placa_mae_modelo,
        os: device.sistema_operacional,
        processor: device.processador,
        serial: device.numero_serial,
        type: device.tipo_dispositivo_text,
        user: device.usuario_logado,
      })),
    });

    return devices;
  }
}

export default MilvusService;
