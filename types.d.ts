type MilvusDevice = {
  id: number;
  hostname: string;
  apelido: string;
  ip_interno: string;
  macaddres: string;
  marca: string;
  fabricante: string;
  is_ativo: boolean;
  data_criacao: string;
  ip_externo: string;
  data_ultima_atualizacao: string;
  domain: string;
  sistema_operacional: string;
  sistema_operacional_licenca: string;
  placa_mae: string;
  placa_mae_serial: string;
  processador: string;
  versao_client: string;
  observacao: string;
  usuario_logado: string;
  total_processadores: number;
  numero_serial: string;
  placa_mae_modelo: string;
  data_compra: string;
  data_garantia: string;
  modelo_notebook: string;
  nome_fantasia: string;
  tipo_dispositivo_text: string;
  tipo_dispositivo_icone: string;
};

type MilvusClient = {
  id: number;
  nome_fantasia: string;
  cnpj_cpf: string;
  razao_social: string;
};
