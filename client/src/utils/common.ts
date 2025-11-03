import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { v4 as uuidv4 } from "uuid";

export async function getBrowserFingerPrint(): Promise<string | null> {
  const browserFingerPrint = localStorage.getItem("browserFingerPrint");
  if (browserFingerPrint) return browserFingerPrint;
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    localStorage.setItem("browserFingerPrint", result.visitorId);
    return result.visitorId;
  } catch (error) {
    // console.error("获取浏览器指纹失败:", error);
    const uuid = uuidv4();
    localStorage.setItem("browserFingerPrint", uuid);
    return uuid;
  }
}
