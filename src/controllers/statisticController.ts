import { Request, Response } from "express";
import { statisticService } from "@/services/statisticService";

export const statisticOrdersController = {
  async list(req: Request, res: Response) {
    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);
    const data = await statisticService.findAll({ limit, offset });
    res.json({ success: true, data });
  },

  async statistics(req: Request, res: Response) {
    try {
      const { type, date, month, year } = req.query;

      let data: any[] = [];

      if (type === "daily") {
        const targetDate = date ? new Date(String(date)) : new Date();
        if (isNaN(targetDate.getTime())) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Invalid date format. Use YYYY-MM-DD",
            });
        }
        data = await statisticService.findByDay(targetDate);

        return res.json({
          success: true,
          type,
          date: targetDate.toISOString().split("T")[0],
          count: data.length,
          data,
        });
      }

      if (type === "monthly") {
        const targetMonth = month ? new Date(`${month}-01`) : new Date();
        if (isNaN(targetMonth.getTime())) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Invalid month format. Use YYYY-MM",
            });
        }
        data = await statisticService.findByMonth(targetMonth);

        return res.json({
          success: true,
          type,
          month: `${targetMonth.getFullYear()}-${String(
            targetMonth.getMonth() + 1
          ).padStart(2, "0")}`,
          count: data.length,
          data,
        });
      }

      if (type === "yearly") {
        const targetYear = year
          ? parseInt(String(year))
          : new Date().getFullYear();
        if (isNaN(targetYear)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid year format. Use YYYY" });
        }
        data = await statisticService.findByYear(targetYear);

        return res.json({
          success: true,
          type,
          year: targetYear,
          count: data.length,
          data,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid type. Use daily, monthly, or yearly",
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  },

  async statsByCategory(req: Request, res: Response) {
    const stats = await statisticService.statsByCategory();
    res.json({ success: true, data: stats });
  },
};
