export class MaterialProdutoDTO {
    cd_cfop1: string; 
    sn_uso_nfce: string; 
    cd_cfop_nfce: string; 
    cd_gtin: string;
    cd_mat: string;
    qt_emb: string;
    cd_gtin_grade: string; 
    cd_similar: string; 
    un_prod: string;
}

export class KitItensDTO {
    cd_mat: string;
    qt_prod: string;
    vl_unit: string;
    nm_unid: string;
    cd_cfop1: string;
    cd_gtin: string;
    ft_unid: string;
    sn_fora: string;
}

export class ProdutoDTO {
    cd_gtin: string; 
    cd_mat: string; 
    nr_serie: string; 
    cd_fil: string; 
    nr_nfce: string; 
    qt_prod: string; 
    vl_unit: string;
    tt_item: string; 
}