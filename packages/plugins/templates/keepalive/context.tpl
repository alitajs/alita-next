import React from 'react';
import { useOutlet, useLocation, matchPath } from 'react-router-dom'

export const KeepAliveContext = React.createContext({});


const isKeepPath = (aliveList: any[], path: string) => {
    let isKeep = false;
    aliveList.map(item => {
        if (item === path) {
            isKeep = true;
        }
        if (item instanceof RegExp && item.test(path)) {
            isKeep = true;
        }
        if (typeof item === 'string' && item.toLowerCase() === path) {
            isKeep = true;
        }
    })
    return isKeep;
}

export function useKeepOutlets() {
    const location = useLocation();
    const element = useOutlet();
    const { keepElements, keepalive } = React.useContext<any>(KeepAliveContext);
    const isKeep = isKeepPath(keepalive, location.pathname);
    if (isKeep) {
        keepElements.current[location.pathname] = element;
    }
    return <>
        {
            Object.entries(keepElements.current).map(([pathname, element]: any) => (
                <div key={pathname} style={ { height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' } } className="rumtime-keep-alive-layout" hidden={!matchPath(location.pathname, pathname)}>
                    {element}
                </div>
            ))
        }
        <div hidden={isKeep} style={ { height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' } } className="rumtime-keep-alive-layout-no">
            {!isKeep && element}
        </div>
    </>
}
