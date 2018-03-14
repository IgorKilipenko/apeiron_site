import img1 from '../public/imgs/products/St01-Stoyka-dlya-sverleniya.png';
import img2 from '../public/imgs/products/Petlya-dvernaya-APP-2.png';
import img3 from '../public/imgs/products/Petlya-dvernaya-APP-3.png';
import img4 from '../public/imgs/products/Petlya-dlya-PVH-dverey-APD120.png';
import img5 from '../public/imgs/products/Zakladnaya-AKP-4528.png';
import img6 from '../public/imgs/products/Zakladnaya-AKP-4510.png';
import img7 from '../public/imgs/products/Zakladnaya-AKP-4509.png';
import img8 from '../public/imgs/products/Ruchka-bugelnaya-ARD-01.png';
import img9 from '../public/imgs/products/Nazhimnoy-garnitur-AGN-85.25.42-75-min.png';
import img10 from '../public/imgs/products/Nazhimnoy-garnitur-AGN-92.25.42-75.png';
import img10_1 from '../public/imgs/products/Perekhodnik-dlya-profilya-s-termorazryvom.png';
import img10_2 from '../public/imgs/products/Konduktor-dlya-petel-APP-i-APV.png';

import _ from 'lodash'

export const productListDoors = [
    /* Фурнитура для входных групп */
    /* Петли дверные */
    /*{
        id: 0,
        groupId: 0,
        subgroupId: 0,
        title: 'Петля для ПВХ дверей АПД120',
        img: img4,
        description: 'Применимо для всех систем профилей ПВХ с наплывом от 17,5 до 20,5 мм',
        information: ''
    },*/
    [
        {
            id: 16,
            groupId: 0,
            subgroupId: 0,
            connectedId: 1,
            title: 'Петля дверная АПП-2',
            img: img2,
            description:
                'Двухсекционная подшипниковая петля предназначена для установки на алюминиевые двери.',
            information:
                'Регулируется в трех направлениях. Крепится к профилю при помощи закладных. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 24 шт.'
        },
        {
            id: 22,
            groupId: 0,
            subgroupId: 0,
            connectedId: 1,
            title: 'Петля дверная АПВ-2',
            img: img2,
            description:
                'Двухсекционная втулочная петля предназначена для установки на алюминиевые двери. Регулируется в трех направлениях.',
            information:
                'Крепится к профилю при помощи закладных. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 24 шт.'
        }
    ],
    [
        {
            id: 17,
            groupId: 0,
            subgroupId: 0,
            connectedId: 1,
            title: 'Петля дверная АПП-3',
            img: img3,
            description:
                'Трехсекционная подшипниковая петля предназначена для установки на алюминиевые двери.',
            information:
                'Регулируется в трех направлениях. Крепится к профилю при помощи закладных. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 16 шт.'
        },
        {
            id: 23,
            groupId: 0,
            subgroupId: 0,
            connectedId: 1,
            title: 'Петля дверная АПВ-3',
            img: img3,
            description:
                'Трехсекционная втулочная петля предназначена для установки на алюминиевые двери.',
            information:
                'Регулируется в трех направлениях. Крепится к профилю при помощи закладных. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 16 шт.'
        }
    ],
    {
        id: 61,
        groupId: 0,
        subgroupId: 0,
        connectedId: undefined,
        title: 'Стойка для сверления отверстий под петли',
        img: img1,
        description:
            'Устройство для быстрой и точной обработки профиля специально для установки петель АПП и АПВ',
        information: ''
    },
    /* Закладные для систем КП-45 */
    {
        id: 14,
        groupId: 0,
        subgroupId: 1,
        connectedId: undefined,
        title: 'Закладная АКП 4528',
        img: img5,
        description: 'Используется для соединения дверных углов рам, створок.',
        information: 'Упаковка: 48 шт.'
    },
    {
        id: 13,
        groupId: 0,
        subgroupId: 1,
        connectedId: undefined,
        title: 'Закладная АКП 4510',
        img: img6,
        description: 'Используется для крепления импоста к раме, стойке.',
        information: 'Упаковка: 256, 112 шт.'
    },
    {
        id: 12,
        groupId: 0,
        subgroupId: 1,
        connectedId: undefined,
        title: 'Закладная АКП 4509',
        img: img7,
        description: 'Используется для соединения углов оконных рам, створок.',
        information: 'Упаковка: 120 шт.'
    },
    /* Ручки бугельные */
    {
        id: 18,
        groupId: 0,
        subgroupId: 2,
        connectedId: undefined,
        title: 'Ручка бугельная АРД-01',
        img: img8,
        description:
            'Предназначены для установки на двери из алюминиевого и ПВХ профиля толщиной от 40мм до 80мм.',
        information:
            'Диаметр сечения 30мм. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 6шт.'
    },
    /* Нажимные гарнитуры */
    {
        id: 60,
        groupId: 0,
        subgroupId: 3,
        connectedId: undefined,
        title: 'Нажимной гарнитур АГН-85.25.42-75',
        img: img9,
        description:
            'Предназначен для установки на двери из алюминиевого и ПВХ профиля толщиной от 42мм до 75мм.',
        information:
            'RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 12 шт.'
    },
    {
        id: 25,
        groupId: 0,
        subgroupId: 3,
        connectedId: undefined,
        title: 'Нажимной гарнитур АГН-92.25.42-75',
        img: img10,
        description:
            'Предназначен для установки на двери из алюминиевого и ПВХ профиля толщиной от 42мм до 75мм.',
        information:
            'RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 12 шт.'
    },
    /*Переходники*/
    {
        id: 27,
        groupId: 0,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Переходник для профиля с терморазрывом',
        img: img10_1,
    },
        /*Кондуктор для петель*/
    {
        id: 28,
        groupId: 0,
        subgroupId: 5,
        connectedId: undefined,
        title: 'Кондуктор для петель АПП и АПВ',
        img: img10_2,
    }
];

import img11 from '../public/imgs/products/Zakladnaya-AKP-45.15.png';
import img12 from '../public/imgs/products/Zakladnaya-AKP-45.14.png';
import img13 from '../public/imgs/products/Zakladnaya-AKP-45.31.png';
import img14 from '../public/imgs/products/Zakladnaya-AKP-45.32.png';
import img15 from '../public/imgs/products/Zakladnaya-AKP-4509.png';
import img16 from '../public/imgs/products/Zakladnaya-AKP-4510.png';
import img17 from '../public/imgs/products/Zaschelka-balkonnaya-AZB-03A.png';
import img18 from '../public/imgs/products/Petlya-okonnaya-APO-R400.png';
import img19 from '../public/imgs/products/Petlya-okonnaya-APD-R400.png';

export const productListWindows = [
    /* Фурнитура для системы Provedal */
    /* Закладные */
    {
        id: 6,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 45.15',
        img: img11,
        description: 'Используется для соединения углов оконных рам, створок.',
        information: 'Упаковка: 192 шт.'
    },
    {
        id: 20,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 45.14',
        img: img12,
        description:
            'Используется для соединения импоста и оконных рам, створок.',
        information: 'Упаковка: 288 шт.'
    },
    {
        id: 21,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 45.31',
        img: img13,
        description:
            'Используется для соединения импоста и дверных рам, створок.',
        information: 'Упаковка: 120 шт.'
    },
    {
        id: 1,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 45.32',
        img: img14,
        description: 'Используется для соединения углов дверных рам, створок. ',
        information: 'Упаковка: 96 шт.'
    },
    {
        id: 31,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 4509',
        img: img15,
        description: 'Используется для сборки углов оконных рам, створок',
        information: ''
    },
    {
        id: 32,
        groupId: 1,
        subgroupId: 4,
        connectedId: undefined,
        title: 'Закладная АКП 4510',
        img: img16,
        description: 'Используется для крепления импоста к раме, створке.',
        information: 'Исполнения 14,8 мм и 31 мм.'
    },
    /* Защелки */
    {
        id: 66,
        groupId: 1,
        subgroupId: 5,
        connectedId: undefined,
        title: 'Защелка балконная АЗБ-03А',
        img: img17,
        description: 'ПВХ защелка "Альфа" для систем PROVEDAL',
        information: ''
    },
    /* Петли */
    {
        id: 8,
        groupId: 1,
        subgroupId: 6,
        connectedId: undefined,
        title: 'Петля оконная АПО-Р400',
        img: img18,
        description: 'Предназначена для установки на алюминиевые окна.',
        information:
            'Крепится винтами к закладным элементам. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ . Упаковка: 96 шт.'
    },
    {
        id: 9,
        groupId: 1,
        subgroupId: 6,
        connectedId: undefined,
        title: 'Петля дверная АПД-Р400',
        img: img19,
        description:
            'Предназначена для установки на легкие алюминиевые двери. ',
        information:
            'Крепится винтами к закладным элементам. RAL 9016 в наличии, н/о в наличии, любой другой цвет под заказ. Упаковка: 96 шт.'
    }
];

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

export const products = [..._.flatMapDeep(productListDoors), ..._.flatMapDeep(productListWindows)];
