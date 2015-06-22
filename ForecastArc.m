
#import <UIKit/UIKit.h>

@interface ForecastArc : UIView{
}
@property (nonatomic) float forecastvalue;
@property (nonatomic,strong) UIColor *forecastcolor;
@end

#define debug 0

@implementation ForecastArc

@synthesize forecastvalue = _forecastvalue;
@synthesize forecastcolor = _forecastcolor;

- (id)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    
  }
  return self;
}

- (void)setForecastValue:(float)forecastValue
{
  _forecastvalue= forecastValue;
}
-(void) setColor:(NSString *)color{
  // Default is red...
  _forecastcolor = [UIColor colorWithRed:1.000
                                   green:0.250
                                    blue:0.250
                                   alpha:1.000];
  
  if([color isEqualToString:@"red"]){
    _forecastcolor = [UIColor colorWithRed:1.000
                                     green:0.250
                                      blue:0.250
                                     alpha:1.000];
  }
  if([color isEqualToString:@"orange"]){
    _forecastcolor = [UIColor colorWithRed:1.000
                                     green:0.708
                                      blue:0.014
                                     alpha:1.000];
  }
  if([color isEqualToString:@"yellow"]){
    _forecastcolor = [UIColor colorWithRed:1.000
                                     green:0.997
                                      blue:0.369
                                     alpha:1.000];
  }
  
  if([color isEqualToString:@"green"]){
    _forecastcolor = [UIColor colorWithRed:0.381
                                     green:1.000
                                      blue:0.369
                                     alpha:1.000];
  }
  
  if([color isEqualToString:@"blue"]){
    _forecastcolor = [UIColor colorWithRed:0.374
                                     green:0.369
                                      blue:1.000
                                     alpha:1.000];
  }
  
  if([color isEqualToString:@"purple"]){
    _forecastcolor = [UIColor colorWithRed:0.514
                                     green:0.283
                                      blue:0.768
                                     alpha:1.000];
  }
}

#pragma mark - Arc
- (void)drawRect:(CGRect)rect {
  float heightOfArc=1.0;
  float widthOfArc=236.0;
  float startXPosArc=0.0;
  float startYPosArc=0.0;
  float coloredAngle=0.0;
  
  if(debug) NSLog(@"forecastArc: %f",_forecastvalue);
  
  if(_forecastvalue <=0){
    [self setHidden:YES];
    return;
  }
  else {
    coloredAngle=_forecastvalue*15;
    if(coloredAngle>180) coloredAngle=180;
    [self setHidden:NO];
  }
  
  // second color oval white, overlaid on top of first oval
  CGRect oval2Rect = CGRectMake(startXPosArc, startYPosArc, widthOfArc, heightOfArc);
  
  // Background ARC
  CAShapeLayer *arc = [CAShapeLayer layer];
  arc.path=[UIBezierPath bezierPathWithArcCenter:CGPointMake(0, 25) radius: CGRectGetWidth(oval2Rect) / 2 startAngle: (180) * M_PI/180 endAngle: 360 * M_PI/180 clockwise: YES].CGPath;
  arc.position = CGPointMake(160,120);
  arc.fillColor = [UIColor clearColor].CGColor;
  arc.strokeColor = [UIColor whiteColor].CGColor;
  arc.lineWidth = 24;
  
  CABasicAnimation *drawAnimation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
  drawAnimation.duration            = 0.0; // "animate over 10 seconds or so.."
  drawAnimation.repeatCount         = 1.0;  // Animate only once..
  drawAnimation.removedOnCompletion = NO;   // Remain stroked after the animation..
  drawAnimation.fromValue = [NSNumber numberWithFloat:0.0f];
  drawAnimation.toValue   = [NSNumber numberWithFloat:10.0f];
  drawAnimation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
  [arc addAnimation:drawAnimation forKey:@"drawCircleAnimation"];
  
  CAGradientLayer *gradientLayer = [CAGradientLayer layer];
  gradientLayer.frame = self.frame;
  gradientLayer.colors = @[(__bridge id)[UIColor whiteColor].CGColor,(__bridge id)[UIColor whiteColor].CGColor ];
  gradientLayer.startPoint = CGPointMake(0,0.5);
  gradientLayer.endPoint = CGPointMake(1,0.5);
  
  [self.layer addSublayer:gradientLayer];
  //Using arc as a mask instead of adding it as a sublayer.
  gradientLayer.mask = arc;
  
  /* Foreground arc */
  arc = [CAShapeLayer layer];
  arc.path=[UIBezierPath bezierPathWithArcCenter:CGPointMake(0, 25) radius: CGRectGetWidth(oval2Rect) / 2 startAngle: (180) * M_PI/180 endAngle: (180+coloredAngle) * M_PI/180 clockwise: YES].CGPath;
  arc.position = CGPointMake(160,120);
  arc.fillColor = [UIColor clearColor].CGColor;
  arc.strokeColor = _forecastcolor.CGColor;
  arc.lineWidth = 26;
  
  
  CABasicAnimation* drawAnimationFg = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
  drawAnimationFg.duration            = 5.0; // "animate over 10 seconds or so.."
  drawAnimationFg.repeatCount         = 1.0;  // Animate only once..
  drawAnimationFg.removedOnCompletion = YES;   // Remain stroked after the animation..
  drawAnimationFg.fromValue = [NSNumber numberWithFloat:0.0f];
  drawAnimationFg.toValue   = [NSNumber numberWithFloat:10.0f];
  drawAnimationFg.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
  [arc addAnimation:drawAnimationFg forKey:@"drawCircleAnimation"];
  
  gradientLayer = [CAGradientLayer layer];
  gradientLayer.frame = self.frame;
  gradientLayer.colors = @[(__bridge id)_forecastcolor.CGColor,(__bridge id)_forecastcolor
                           .CGColor ];
  gradientLayer.startPoint = CGPointMake(0,0.5);
  gradientLayer.endPoint = CGPointMake(1,0.5);
  
  [self.layer addSublayer:gradientLayer];
  
  //Using arc as a mask instead of adding it as a sublayer.
  gradientLayer.mask = arc;

  [self animationVariable];
}

- (void)animationVariable
{
  return;
  float heightOfArc=260.0;
  float widthOfArc=236.0;
  float startXPosArc=42.0;
  float startYPosArc=0.0;
  float coloredAngle=0.0;
  
  if(debug) NSLog(@"forecastArc: %f",_forecastvalue);
  
  if(_forecastvalue <=0){
    [self setHidden:YES];
  }
  else {
    coloredAngle=_forecastvalue*15;
    if(coloredAngle>180) coloredAngle=180;
    [self setHidden:NO];
  }
  
  if(debug) NSLog(@"color %@",_forecastcolor);
  
  // second colour oval white, overlaid on top of first oval
  CGRect oval2Rect = CGRectMake(startXPosArc, startYPosArc, widthOfArc, heightOfArc);
  
  // Background ARC
  CAShapeLayer *arc = [CAShapeLayer layer];
  arc.path=[UIBezierPath bezierPathWithArcCenter:CGPointMake(0, 25) radius: CGRectGetWidth(oval2Rect) / 2 startAngle: (180+coloredAngle) * M_PI/180 endAngle: (180+coloredAngle+0.5)  * M_PI/180 clockwise: YES].CGPath;
  arc.position = CGPointMake(160,160);
  arc.fillColor = [UIColor clearColor].CGColor;
  arc.strokeColor = [UIColor whiteColor].CGColor;
  arc.lineWidth = 24;
  CABasicAnimation* drawAnimation = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
  drawAnimation.duration            = 0.9; // "animate over 10 seconds or so.."
  drawAnimation.repeatCount         = 10000.0;  // Animate only once..
  drawAnimation.removedOnCompletion = NO;   // Remain stroked after the animation..
  drawAnimation.fromValue = [NSNumber numberWithFloat:0.0f];
  drawAnimation.toValue   = [NSNumber numberWithFloat:10.0f];
  drawAnimation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
  [arc addAnimation:drawAnimation forKey:@"drawCircleAnimation"];
  
  CAGradientLayer* gradientLayer = [CAGradientLayer layer];
  gradientLayer.frame = self.frame;
  gradientLayer.colors = @[(__bridge id)_forecastcolor.CGColor,(__bridge id)_forecastcolor
                           .CGColor ];
  gradientLayer.startPoint = CGPointMake(0,0.5);
  gradientLayer.endPoint = CGPointMake(1,0.5);
  
  [self.layer addSublayer:gradientLayer];
  
  //Using arc as a mask instead of adding it as a sublayer.
  gradientLayer.mask = arc;
  
}

@end