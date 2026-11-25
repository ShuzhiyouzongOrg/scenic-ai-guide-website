/**
 * @fileoverview 智游华章站点品牌标识组件。
 *
 * @description
 * 组合品牌图形、中英文品牌名称与首页链接，为页头和页脚提供统一的品牌入口。
 */
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/**
 * @description 渲染指向站点首页的智游华章品牌标识，并根据部署基路径解析品牌图片地址。
 * @returns {import('react').JSX.Element} 包含品牌图形与中英文名称的首页链接。
 * @example
 * <Brand />
 */
export function Brand() {
  const { t } = useLanguage()
  const brandMark = `${import.meta.env.BASE_URL}brand/brand-mark.png`

  return (
    <Link className="brand" to="/" aria-label={t('brandHome')}>
      <img className="brand-mark" src={brandMark} alt="" />
      <span className="brand-copy">
        <strong>{t('brandName')}</strong>
        <small>STORIES OF CHINA</small>
      </span>
    </Link>
  )
}
