import {useEffect, useState} from "react";

import search from "@/api/search";

import {validateConfig, setConfig, getConfig} from "@/utils/utils";

const SettingDialog = () => {
    const [params, setParams] = useState({});
    const [serverConfig, setServerConfig] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [isGettingServerConfig, setIsGettingServerConfig] = useState(true);

    const save = () => {
        if (!validateConfig(params)) {
            showToastPanel();
            return;
        }

        setConfig(params);
        document.getElementById('model_setting').close();
    }

    const getServerConfig = async () => {
        const res = await search.getConfig();
        if (!res) {
            setServerConfig(null);
            return;
        }

        setServerConfig(res);
        setParams(getConfig());
        setIsGettingServerConfig(false);
    }

    const showToastPanel = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    }

    useEffect(() => {
        getServerConfig();
    }, []);

    return (
        <dialog id="model_setting" className="modal modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">参数设置</h3>

                {isGettingServerConfig ? (
                    <div className="flex flex-col justify-center items-center py-6">
                        <span className="loading loading-dots loading-lg"></span>
                        <span className="text-sm">正在获取配置</span>
                    </div>
                ) : (
                    <>
                        <div className="collapse collapse-open">
                            <div className="collapse-title">基础模型</div>

                            <div className="collapse-content text-sm">
                                <label className="select w-full">
                                    <span className="label">模型提供方</span>
                                    <select value={params?.ai?.base?.provider || ''} onChange={e => setParams(old => ({
                                        ...old,
                                        ai: {
                                            ...old.ai,
                                            base: {
                                                ...old.ai?.base,
                                                provider: e.target.value
                                            }
                                        }
                                    }))}>
                                        <option value="" disabled hidden></option>
                                        {serverConfig && Object.keys(serverConfig).map(e => (
                                            <option key={`base${e}`}>{e}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="input w-full ps-4 mt-3">
                                    <span className="label">模型名字</span>
                                    <input type="text" list="model_list_base" value={params?.ai?.base?.model || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               ai: {
                                                   ...old.ai,
                                                   base: {
                                                       ...old.ai?.base,
                                                       model: e.target.value
                                                   }
                                               }
                                           }))}/>
                                    <datalist id="model_list_base">
                                        {serverConfig && params?.ai?.base?.provider && serverConfig[params.ai.base.provider]?.base?.map(e => (
                                            <option key={`base${e}`} value={e}/>
                                        ))}
                                    </datalist>
                                </label>

                                <label className="input w-full ps-4 mt-3">
                                    <span className="label">API Key</span>
                                    <input type="text" value={params?.ai?.base?.key || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               ai: {
                                                   ...old.ai,
                                                   base: {
                                                       ...old.ai?.base,
                                                       key: e.target.value
                                                   }
                                               }
                                           }))}/>
                                </label>
                            </div>
                        </div>

                        <div className="collapse collapse-open">
                            <div className="collapse-title">思考模型</div>

                            <div className="collapse-content text-sm">
                                <label className="select w-full">
                                    <span className="label">模型提供方</span>
                                    <select value={params?.ai?.thinking?.provider || ''}
                                            onChange={e => setParams(old => ({
                                                ...old,
                                                ai: {
                                                    ...old.ai,
                                                    thinking: {
                                                        ...old.ai?.thinking,
                                                        provider: e.target.value
                                                    }
                                                }
                                            }))}>
                                        <option value="" disabled hidden></option>
                                        {serverConfig && Object.keys(serverConfig).map(e => (
                                            <option key={`thinking${e}`}>{e}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="input w-full ps-4 mt-3">
                                    <span className="label">模型名字</span>
                                    <input type="text" list="model_list_thinking"
                                           value={params?.ai?.thinking?.model || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               ai: {
                                                   ...old.ai,
                                                   thinking: {
                                                       ...old.ai?.thinking,
                                                       model: e.target.value
                                                   }
                                               }
                                           }))}/>
                                    <datalist id="model_list_thinking">
                                        {serverConfig && params?.ai?.thinking?.provider && serverConfig[params.ai.thinking.provider]?.thinking?.map(e => (
                                            <option key={`thinking${e}`} value={e}/>
                                        ))}
                                    </datalist>
                                </label>

                                <label className="input w-full ps-4 mt-3">
                                    <span className="label">API Key</span>
                                    <input type="text" value={params?.ai?.thinking?.key || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               ai: {
                                                   ...old.ai,
                                                   thinking: {
                                                       ...old.ai?.thinking,
                                                       key: e.target.value
                                                   }
                                               }
                                           }))}/>
                                </label>
                            </div>
                        </div>

                        <div className="collapse collapse-open">
                            <div className="collapse-title">Google Custom Search（可选）</div>

                            <div className="collapse-content text-sm">
                                <label className="input w-full ps-4">
                                    <span className="label">API Key</span>
                                    <input type="text" value={params?.search?.key || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               search: {
                                                   ...old.search,
                                                   key: e.target.value
                                               }
                                           }))}/>
                                </label>

                                <label className="input w-full ps-4 mt-3">
                                    <span className="label">CX</span>
                                    <input type="text" value={params?.search?.cx || ''}
                                           onChange={e => setParams(old => ({
                                               ...old,
                                               search: {
                                                   ...old.search,
                                                   cx: e.target.value
                                               }
                                           }))}/>
                                </label>
                            </div>
                        </div>
                    </>
                )}

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">取消</button>
                    </form>

                    <button className="btn ml-4" onClick={() => save()}>保存</button>
                </div>
            </div>

            <div className={`${showToast ? 'block' : 'hidden'} toast toast-center toast-middle`}>
                <div className="alert alert-error text-white">
                    <span>请先将参数填写完整！！</span>
                </div>
            </div>
        </dialog>
    );
}

export default SettingDialog;
