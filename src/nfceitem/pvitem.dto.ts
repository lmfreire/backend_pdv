export class BuscaPvItemDTO {
    nr_pv: string;
    cd_fil: string;
    
}

export class NfpedDTO  extends BuscaPvItemDTO{
    nr_nf: string;
    nr_ped: string;
    cd_modelo: string;
}

export class NfceItemDTO extends NfpedDTO {
    nr_serie: string;    
    nr_nfce: string;
}