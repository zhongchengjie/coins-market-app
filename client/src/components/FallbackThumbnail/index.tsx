import React, { useState, useEffect } from "react";
import { Thumbnail, ThumbnailProps } from "@shopify/polaris";
import CoinDefaultImg from "../../assets/images/coin_default_img.png";

interface FallbackThumbnailProps extends Omit<ThumbnailProps, "source" | "alt"> {
  src: string; // 图片地址
  alt: string; // 图片描述
  fallbackSrc?: string; // 默认图片地址
  fallbackAlt?: string; // 加载失败时的替代文本
  size?: "extraSmall" | "small" | "medium" | "large"; // 图片大小
}

/**
 * 带错误处理的缩略图组件
 * 当图片加载失败时自动显示默认图片
 */
export const FallbackThumbnail: React.FC<FallbackThumbnailProps> = ({ src, alt, fallbackSrc = CoinDefaultImg, fallbackAlt, size = "medium", ...thumbnailProps }) => {
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  useEffect(() => {
    // 重置状态当 src 发生变化时
    setImgLoadError(false);

    // 预加载图片检测是否有效
    const img = new Image();

    const handleLoad = () => {
      setImgLoadError(false);
    };

    const handleError = () => {
      setImgLoadError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    // 清理函数
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  // 计算最终的图片源和替代文本
  const finalSrc = imgLoadError ? fallbackSrc : src;
  const finalAlt = imgLoadError ? fallbackAlt || `默认图片 - ${alt}` : alt;

  return <Thumbnail source={finalSrc} alt={finalAlt} size={size} {...thumbnailProps} transparent />;
};

export default FallbackThumbnail;
