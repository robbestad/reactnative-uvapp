//
//  ForecastArc.m
//  UV Index
//
//  Created by Sven Anders Robbestad on 01.04.14.
//  Copyright (c) 2014-2015 Inmeta. ISC license.
//

#import "RCTViewManager.h"
#import <UIKit/UIKit.h>
#import  "RCTBridge.h"
#import "RCTViewManager.h"
#import "ForecastArc.m"

@interface ForecastArcManager : RCTViewManager
@end

@implementation ForecastArcManager: RCTViewManager

// Expose this module to the React Native bridge

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(forecastValue, float);
RCT_EXPORT_VIEW_PROPERTY(color, NSString);

- (UIView *)view
{
  return [[ForecastArc alloc] init];
}

@end
