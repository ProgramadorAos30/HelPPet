import React, { useEffect, useState, useRef } from 'react';
import * as S from './style';
import { useForm, Controller } from "react-hook-form";
import { api, useUf, useCity } from "../../../services";
import { CustomInput, CustomSelect, CustomSwitch, ModalMsg, PersonalModal } from '../../../components/index';
import { FormData, IProps } from "./types";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import { regex, numberClean } from '../../../services/functions/regex'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema";

async function postUser(data: FormData) {
    const { data: response } = await api.post('/signup', data);
    return response.data;
}

const EditForm: React.FC <IProps> =  ({onClose, isModal}) => {

    const { data: uf, isLoading: loadingUf } = useUf();

    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid  },
        control,
        watch,
        setValue,
        reset,
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    const { mutate, isLoading } = useMutation(postUser, {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
          setOpen(true);
        }
    });

    const [ open, setOpen ] = useState(false);

    const onSubmit = (values: FormData) => {

        let obj = Object.assign(values, { 
            "phone_number": numberClean(values.phone_number),
            "role": "Administrador",
        })
        mutate(obj);
        console.log(obj, 'valores');
    };
    const watchPhone = watch('phone_number');
    console.log(watchPhone, 'teste')

    const watchUf = watch('state');

    const { data: city, isLoading: loadingCity } = useCity(watchUf);

    useEffect(() => {
        if (!isModal) {
            reset()
        }
    },[isModal,reset])

    return (
        <PersonalModal
            modalBackground={false}
            padding={4}
            width={858}
            open={isModal}
            onClose={onClose}
        >
        <S.Container>
            <h1>Editar moderador</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <fieldset>
                    <Controller
                            control={control}
                            name="name"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <CustomInput
                                        width={372}
                                        type="text"
                                        label="Nome do moderador"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                    {errors.name && (
                                        <span>{errors.name.message}</span>
                                    )}                                    
                                </span>
                            )}
                        />                     
                        <Controller
                            control={control}
                            name="password"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomInput
                                            width={372} 
                                            label="Senha do moderador"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            type="password"
                                        />
                                    </div>                                    
                                    {errors.password && (
                                        <span>{errors.password.message}</span>
                                    )}
                                </span>
                            )}
                        />                    
                    </fieldset>
                    <fieldset>
                        <Controller
                            control={control}
                            name="phone_number"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomInput
                                            width={372}
                                            type="text"
                                            label={value === "" ? 'Numero do celular' : 'Celular'}
                                            value={value}
                                            onChange={(e: any) => {
                                                let numero = regex(e?.target?.value)
                                                if(numero.length <= 15){
                                                    onChange(numero)
                                                }
                                            }}
                                            onBlur={(e: any) => {
                                                let numero = regex(e?.target?.value)
                                                if(numero.length <= 15){
                                                    onBlur()
                                                }
                                            }}
                                        />
                                    </div>                                   
                                    {errors.phone_number && (
                                        <span>{errors.phone_number.message}</span>
                                    )}
                                </span>
                            )}
                        /> 
                        <Controller
                            control={control}
                            name="email"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomInput
                                            width={372}
                                            type="text"
                                            label={value === "" ? value : 'E-mail'}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    </div>
                                </span>
                            )}
                        />
                    </fieldset>
                    <fieldset>
                        <Controller
                            control={control}
                            name="state"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomSelect 
                                                list={uf}
                                                label="Estado"
                                                labelDefault="Selecione o Estado" 
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                width={372}
                                            />
                                    </div>                                    
                                    {errors.state&& (
                                        <span>{errors.state.message}</span>
                                    )}
                                </span>
                            )}
                        />
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => ( 
                                <span>
                                    <div>
                                        <CustomSelect 
                                            list={city}
                                            label="Cidade"
                                            labelDefault="Selecione a Cidade"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            width={372}
                                        />
                                    </div>
                                    {errors.city&& (
                                        <span>{errors.city.message}</span>
                                    )}
                                </span>
                            )}
                        />
                    </fieldset>
                    <fieldset>
                        <div>
                            <p>Status do usuário:</p>
                            <span>
                                <Controller 
                                    control={control}
                                    name="active"
                                    render={({field: { onChange, onBlur, value }}) => (
                                        <CustomSwitch
                                            leftLabel="Inativo"
                                            rightLabel="Ativo"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                            </span>
                        </div>
                    </fieldset>
                </div>
                <S.ContainerBnt>
                    <button type="button" onClick={onClose} >Cancelar</button>
                    <S.Button
                        id='submit' 
                        type='submit'
                        disabled={!isDirty || !isValid}
                    >
                        {isLoading == true ? 'Salvando...' : 'Salvar'}
                    </S.Button>
                </S.ContainerBnt>
            </form>
            <ModalMsg 
                    height='312px'
                    modalBackground={false}
                    open={open} 
                    onClose={() => {
                        setOpen(!open)
                        onClose()
                    }} 
                    width={375} 
                    status={'success'} 
                    mensage='O moderador foi editado com sucesso!'            
                />
        </S.Container>
        </PersonalModal>
    );
};


export default EditForm;