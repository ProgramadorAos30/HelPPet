import React, { useState } from 'react';
import * as S from './style';
import NewUser from './NewUser';
import {
    CardInfo,
    CustomSelect,
    DefaultButton,
    DoubleButton,
    PersonalModal,
    Search,
    Pagination,
    CustomTolltip,
} from '../../components';
import { useUsers } from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
    iconShow,
    ocurrenceIcon,
    alertDark,
    trusted,
    noTrusted,
    options,
} from '../../assets';

const Usuarios: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: users } = useUsers(token);
    const [openList, setOpenList] = useState(false);
    const [open, setOpen] = useState(false);
    const [app, setApp] = useState(true);
    const [panel, setPanel] = useState(false);

    console.log(users);

    let lista = [
        { label: 'Pesquisar 1', value: 'pesquisa1', number: 1 },
        { label: 'Pesquisar 2', value: 'pesquisa2', number: 2 },
        { label: 'Pesquisar 3', value: 'pesquisa3', number: 3 },
        { label: 'Pesquisar 4', value: 'pesquisa4', number: 4 },
        { label: 'Pesquisar 5', value: 'pesquisa5', number: 5 },
        { label: 'Pesquisar 6', value: 'pesquisa6', number: 5 },
    ]; //id.city, id.state,


    return (
        <>
            <S.Nav>
                <div>
                    <DoubleButton
                        text='Usuários do aplicativo'
                        selected={app}
                        onSelect={() => {
                            setApp(true)
                            setPanel(false)
                        }}
                    />
                    <DoubleButton
                        text='Usuários do painel'
                        selected={panel}
                        onSelect={() => {
                            setApp(false)
                            setPanel(true)
                        }}
                    />
                </div>
                {panel === true && (
                    <DefaultButton
                        onSelect={() => setOpen(!open)}
                        text="Cadastrar moderador"
                    />
                )}
            </S.Nav>
            <>
                {app === true && (
                    <>
                        <S.CardList>
                            <CardInfo
                                icon={ocurrenceIcon}
                                title="Total"
                                value={20}
                                type="list"
                                width='273px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                            <CardInfo
                                title="Sul"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                            <CardInfo
                                title="Norte"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                            <CardInfo
                                title="Sudeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                            <CardInfo
                                title="Nordeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                            <CardInfo
                                title="Centro-Oeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openList}
                                setOpen={() => setOpenList(!openList)}
                            />
                        </S.CardList>

                        <S.ContainerListApp>
                            <S.SearchInputs>
                                <p>Usuários cadastrados no aplicativo</p>
                                <div>
                                    <Search
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                        }}
                                        width='409px'
                                    />

                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Raça'
                                        labelDefault='Raça'
                                        list={undefined}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Genero'
                                        labelDefault='Genero'
                                        list={undefined}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Estado'
                                        labelDefault='Estado'
                                        list={undefined}
                                        value='Todos os Estados'
                                        width={176}
                                    />
                                </div>
                            </S.SearchInputs>

                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th>
                                            <span>
                                                Nome / Apelido
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Whatsapp
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                E-mail
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Estado
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Cidade
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Status
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Confiabilidade
                                                <span>
                                                    <CustomTolltip
                                                        title={<img src={alertDark} alt="" />}
                                                        desciption="Usuários que são marcados como não confiáveis precisarão passar pela aprovação dos moderadores antes de serem publicadas"
                                                    />
                                                </span>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Ações
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                {users?.map((id: any) => {
                                    return (
                                        <tbody>
                                            {id.role === 'Mobile' && (
                                                <tr>
                                                    <td>
                                                        <span>
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.phone_number}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <S.Active active={id.active}>
                                                            {id.active === true ? "Ativo" : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td>
                                                        <S.Trusted trusted={id.trusted}>
                                                            <img width="20px" src={id.trusted === true ? trusted : noTrusted} alt={id.trusted === true ? "Confiável" : "Não confiável"} />
                                                            {id.trusted === true ? "Confiável" : "Não confiável"}
                                                        </S.Trusted>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <S.Options>
                                                                <img src={options} alt="Opções" />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    )
                                })}
                            </S.Table>

                        </S.ContainerListApp>
                    </>

                )}

                {panel === true && (
                    <>
                        <S.ContainerListApp>
                            <S.SearchInputs>
                                <p>Usuários cadastrados no painel</p>
                                <Search
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                    }}
                                    width='822px'
                                />
                            </S.SearchInputs>
                            <div>
                            </div>
                            <PersonalModal
                                modalBackground={true}
                                padding={4}
                                width={858}
                                open={open}
                                onClose={() => setOpen(!open)}
                                children={<NewUser />}
                            />
                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th>
                                            <span>
                                                Nome do moderador
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Whatsapp
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                E-mail
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Estado
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Cidade
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Tipo de acesso
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Status
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th>
                                            <span>
                                                Ações
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                {users?.map((id: any) => {
                                    return (
                                        <tbody>
                                            {id.role === 'Administrador' && (
                                                <tr>
                                                    <td>
                                                        <span>
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.phone_number}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    <S.Role role={id.role}>
                                                        <span>
                                                            {id.role === "Administrador" ? `${id.role}` : `${id.role}`}
                                                        </span>
                                                    </S.Role>
                                                    <td>
                                                        <S.Active active={id.active}>
                                                            {id.active === true ? "Ativo" : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            <S.Options>
                                                                <img src={options} alt="Opções" />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    )
                                })}
                            </S.Table>
                        </S.ContainerListApp>
                    </>
                )}
            </>
            <Pagination />
        </>

    )
}

export default Usuarios;